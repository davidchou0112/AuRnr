const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, sequelize, User } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// Routes ---------------------------------------------------------------------------------
// Get all Spots --------PROGRESS-----previewImage and avgRating------------------------
router.get('/', async (req, res) => {
    // pagination
    let { size, page } = req.query

    if (!page) page = 1
    if (!size) size = 20

    page = parseInt(page);
    size = parseInt(size);

    const pagination = {}

    if (page >= 1 && size >= 1) {
        pagination.limit = size
        pagination.offset = size * (page - 1)

    }

    const allSpots = await Spot.findAll({
        ...pagination
    })
    let spot = []

    for (let key of allSpots) {
        const allRating = await Review.findAll({
            where: {
                spotId: key.id
            },
            attributes: [
                [sequelize.fn("AVG", sequelize.col('stars')), "avgRating"],
            ],
            raw: true
        })

        let imageUrl = await SpotImage.findByPk(key.id,
            {
                where: { preview: true },
                attributes: ['url']
            })

        let data = key.toJSON()
        // console.log(data, '---------data')
        // console.log(allRating, '-- this is allRating')

        data.avgRating = allRating[0].avgRating
        data.previewImage = imageUrl.url

        spot.push(data)
    }
    res.json({
        Spots: spot,
        page: page,
        size: size

    })
});

// Create a spot ----------DONE-------------------------------------------------------
router.post('/', requireAuth, async (req, res) => {
    const {
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    } = req.body;

    const userId = req.user.id;

    const spotInfo = await Spot.create({
        ownerId: userId,
        address: address,
        city: city,
        state: state,
        country: country,
        lat: lat,
        lng: lng,
        name: name,
        description: description,
        price: price
    });
    res.json(spotInfo);
});

// // Create an Image for a Spot ---------------------DONE--------------------------------------
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const {
        url,
        preview
    } = req.body

    const { spotId } = req.params
    const spotIdExists = await Spot.findByPk(spotId)

    // If no spot exists
    if (!spotIdExists) {
        res.statusCode = 404,
            res.json({
                "message": "Spot couldn't be found",
                "statusCode": 404
            })
    } else {
        const addImageToSpot = await SpotImage.create({
            "spotId": spotId,
            "url": url,
            preview: preview
            // preview: { 'raw': true}
        })
        res.json(await SpotImage.findByPk(addImageToSpot.id, {
            attributes: [
                'id',
                'url',
                'preview'
            ]
        }))
    }
})

// Get Spots of Current User ----------MISSING AVGRATING AND PREVIEWIMAGE---------------------------------------------
// need user.id, ownerId
router.get('/current', requireAuth, async (req, res) => {
    const currentId = req.user.id;
    console.log(currentId);

    const spots = await Spot.findAll({
        where: {
            ownerId: currentId
        }
    })
    res.json({ spots });
})

// Get Details of a Spot by Id -----------User needs to show as Owner, Preview still Null??-----------------------------------
//
router.get('/:spotId', requireAuth, async (req, res) => {

    // If no spot exists error
    const spot = await Spot.findByPk(req.params.spotId, {
        include: [
            { model: SpotImage, attributes: ['id', 'url', 'preview'] },
            { model: User, attributes: ['id', 'firstName', 'lastName'] }
        ]
    });
    if (!spot) {
        res.status(404)
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    const countReview = await Spot.findByPk(req.params.spotId, {
        include: {
            model: Review,
            attributes: [],
        },
        attributes: [
            [sequelize.fn("COUNT", sequelize.col("review")), "numReviews"],
            [sequelize.fn("AVG", sequelize.col("stars")), "avgStarRating"],
        ],
        raw: true
    });
    let spotJSON = spot.toJSON();
    spotJSON.numReviews = countReview.numReviews;

    const avgRating = countReview.avgStarRating;
    spotJSON.avgStarRating = Number(avgRating).toFixed(1);

    res.json(spotJSON);
})

// Edit a Spot ----------DONE--------------------------------------------------------------
router.put('/:spotId', requireAuth, async (req, res) => {
    const {
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    } = req.body;


    // If no spot exists error
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
        res.status(404)
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    }

    // input update
    const updatespot = await spot.update({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    });
    res.json(updatespot);
})

// Create a Review for a Spot -------------------------------------------------------
// using spotId
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
    // need error handler
    const spot = await Spot.findByPk(req.params.spotId)
    if (!spot) {
        res.status(404)
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    }

    // error handler if reviews exist
    const reviewExists = await Review.findOne({
        where: {
            spotId: spot.id,
            userId: req.user.id
        }
    })
    if (reviewExists) {
        res.statusCode = 403
        res.json({
            message: "User already has a review for this spot",
            statusCode: res.statusCode
        })
    }

    // create new review
    const review = await Review.create({
        userId: req.user.id,
        spotId: req.params.spotId,
        review: req.body.review,
        stars: req.body.stars
    });
    res.status(201)
    res.json(review)
})

// Get reviews by Spot id ----------------------------------------------------------------
router.get('/:spotId/reviews', requireAuth, async (req, res) =>{

})

// Export ------------------------------------------------------------------------
module.exports = router;
