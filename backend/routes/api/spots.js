const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, sequelize, User, ReviewImage, Booking } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Op } = require('sequelize');

const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    // .matches(/^[A-Za-z\s]+$/).withMessage('Name must be alphabetic.'),
    // .isAlpha('en-US', {ignoreList: ' '})
    // .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('lat')
        .exists({ checkFalsy: true })
        // .withMessage('Latitude is required')
        // .isLength({ min: -90, max: 90 })
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true })
        // .withMessage('Longitude is required')
        // .isLength({ min: -180, max: 180 })
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Name is required')
        .isLength({ max: 49 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Price per day is required'),
    handleValidationErrors
];

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .withMessage('Stars is required')
        .isLength({ min: 1, max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];


// Routes ---------------------------------------------------------------------------------

// Get all Spots --------------------------------
router.get('/', async (req, res, next) => {
    let { page, size } = req.query;
    //set default values
    if (!page) page = 1;
    if (!size) size = 20;
    page = parseInt(page);
    size = parseInt(size);

    const pagination = {}
    if (page >= 1 && size >= 1) {
        pagination.limit = size;
        pagination.offset = size * (page - 1)
    }
    if (page <= 0 && size <= 0) {
        res.status(400);
        res.json({
            "page": "Page must be greater than or equal to 0",
            "size": "Size must be greater than or equal to 0",
        })
    }
    const spotsall = await Spot.findAll({
        include: {
            model: Review,
            attributes: []
        },
        attributes: {
            include: [
                [
                    sequelize.fn("ROUND", sequelize.fn("AVG", sequelize.col("Reviews.stars")), 2), "avgRating"
                ]
            ]
        },

        group: ["Spot.id"],
        ...pagination,
        raw: true,
        subQuery: false

    })

    for (let spot of spotsall) {
        const spotImage = await SpotImage.findOne({
            attributes: ["url"],
            where: {
                preview: true,
                spotId: spot.id
            },
            raw: true
        })
        if (spotImage) {
            spot.previewImage = spotImage.url
        } else {
            spot.previewImage = null
        }
    }
    res.json({
        Spots: spotsall, "page": page, "size": size
    })
})


// Create a spot ----------DONE-------------------------------------------------------
router.post('/', requireAuth, async (req, res) => {

    // console.log(';alksdjhf;aoisdjfasdoif')

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
    res.status(201);
    res.json(spotInfo);
});

// // Create an Image for a Spot ---------------------DONE--------------------------------------

router.post("/:spotId/images", requireAuth, async (req, res) => {
    const {
        url,
        preview
    } = req.body

    const { spotId } = req.params;
    const spot = await Spot.findByPk(spotId)

    // if no spot exists
    if (!spot) {
        res.status(404);
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    const newImage = await SpotImage.create({
        url, preview, spotId: spot.id
    })

    // console.log(newImage)
    res.status(200)
    res.json({ id: newImage.id, url: newImage.url, preview: newImage.preview })
})




// Get Spots of Current User -------------------------------------------------------
router.get('/current', requireAuth, async (req, res) => {
    const currentId = req.user.id;
    // console.log(currentId);

    const spots = await Spot.findAll({
        where: {
            ownerId: currentId
        }
    })

    for (let spot of spots) {
        const starts = await Review.findAll({
            where: {
                spotId: spot.id
            },
            attributes: [[sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']]
        })
        let avgRating = starts[0].dataValues.avgRating;
        spot.dataValues.avgRating = Number(avgRating)

        let previewImage = await SpotImage.findOne({
            where: {
                spotId: spot.id
            }
        })
        if (previewImage) {
            spot.dataValues.previewImage = previewImage.dataValues.url;
        }
    }


    res.json({ spots });
})

// Get Details of a Spot by Id ----------------------------------------------
router.get('/:spotId', async (req, res, next) => {
    const { spotId } = req.params

    const spotById = await Spot.findByPk(spotId)
    if (!spotById) {
        res.statusCode = 404
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }


    const numReviews = await Review.count({
        where: {
            spotId: spotId
        }
    })

    const allRating = await Review.findAll({
        where: {
            spotId
        },
        attributes: [
            [sequelize.fn("AVG", sequelize.col('stars')), "avgRating"]
        ],
    })

    let imageUrl = await SpotImage.findAll(
        {
            where: { spotId },
            attributes: ['id', 'url', 'preview']
        })

    let owner = await User.findByPk(spotById.ownerId, {
        attributes: ['id', 'firstName', 'lastName']
    })


    data = {
        ...spotById.dataValues,
        numReviews,
        avgStarRating: Number(allRating[0].dataValues.avgRating),
        SpotImages: imageUrl,
        Owner: owner
    }

    res.json(data)
});

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
        return res.json({
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
    return res.json(review)
})

// Get reviews by Spot id ----------------------------------------------------------------
router.get('/:spotId/reviews', async (req, res) => {
    const { spotId } = req.params
    const spotReview = await Spot.findByPk(spotId)
    if (!spotReview) {
        res.statusCode = 404
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    const allReviews = await Review.findAll({
        where: {
            spotId: spotId
        },
        include: [
            {
                model: User,
                attributes: [
                    'id',
                    'firstName',
                    'lastName'
                ]
            }
        ]
    })

    let reviewImage = await ReviewImage.findByPk(spotId, {
        attributes: [
            'id',
            'url'
        ]
    })


    res.json({ Reviews: allReviews, ReviewImages: reviewImage })
})

//create a booking from a spot based on the spots id --------------------------------
router.post('/:spotId/bookings', restoreUser, requireAuth, async (req, res) => {
    const { spotId } = req.params
    const { user } = req
    const { startDate, endDate } = req.body

    // error if spot doesn't exist
    const spot = await Spot.findByPk(spotId)
    if (!spot) {
        res.statusCode = 404
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    // look for my bookings
    const existingBooking = await Booking.findAll({
        where: {
            spotId: spotId,
            startDate: new Date(startDate),
            endDate: new Date(endDate)
        }
    });

    // if booking already exists under spotid
    if (existingBooking[0]) {
        res.status(403)
        return res.json({
            "message": "Sorry, this spot is already booked for the specified dates",
            "statusCode": 403,
            "errors": {
                "startDate": "Start date conflicts with an existing booking",
                "endDate": "End date conflicts with an existing booking"
            }
        })
    }

    if (spot.ownerId !== user.id) {
        const newBooking = await Booking.create({
            "spotId": spot.id,
            "userId": user.id,
            startDate,
            endDate
        })
        res.json(newBooking)

    } else {
        res.statusCode = 403
        return res.json({
            "message": "Spot must belong to the current user",
            "statusCode": 403,
        })
    }
})

// get all bookings for a spot by id
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        res.status(404)
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    if (req.user.id !== spot.ownerId) {
        const bookings = await Booking.findAll({
            where: {
                spotId: spot.id
            },
            attributes: ['spotId', 'startDate', 'endDate']
        })
        return res.json({ Bookings: bookings })
    }

    if (req.user.id === spot.ownerId) {
        const bookings = await Booking.findAll({
            include: {
                model: User,
                // attributes: ['spotId', 'startDate', 'endDate']

                attributes: ['id', 'firstName', 'lastName']
            },
            where: {
                spotId: spot.id
            }
        })
        return res.json({ Bookings: bookings })
        // console.log(Booking, '-------------Bookings---------')
    }
})

//delete a Spot
router.delete('/:spotId', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        res.status = 404
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    if (spot.ownerId !== req.user.id) {
        res.status = 403
        return res.json({
            "message": "Forbidden",
            "statusCode": 403
        })
    }

    spot.destroy()

    res.status = 200
    return res.json({
        message: "Successfully deleted",
        statusCode: 200
    })
})

// Export ------------------------------------------------------------------------
module.exports = router;
