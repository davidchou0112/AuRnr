const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, sequelize } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');



// Get all Spots
router.get('/', async (req, res) => {

    let {size, page} = req.query

    if(!page) page = 1
    if(!size) size = 20

    page = parseInt(page);
    size = parseInt(size);

    const pagination = {}

    if(page >= 1 && size >= 1){
        pagination.limit = size
        pagination.offset = size * (page - 1)

    }

    const allSpots = await Spot.findAll({
        ...pagination
    })
    let spot = []

    for(let key of allSpots){
        const allRating = await Review.findAll({
        where: {
            spotId: key.id
        },
        attributes: [
            [sequelize.fn("AVG", sequelize.col('stars')), "avgRating"],
        ],
        raw: true
        })

        let imageUrl = await SpotImage.findByPk(key.id, {where: { preview: true }, attributes: ['url'] })

        let data = key.toJSON()
        // console.log(data, '---------data')
        // console.log(allRating, '-- this is allRating')

        data.avgRating= allRating[0].avgRating
        data.previewImage = imageUrl.url

        spot.push(data)
             }
            res.json({
        Spots: spot,
        // page:page,
        // size:size

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
    return res.json(spotInfo);
});

// // Create an Image for a Spot -----------------------------------------------------------
// router.post('/:spotId/images', requireAuth, async (req, res) => {

// })
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

// Get Spots of Current User -----------------------------------------------------------------
router.get('/current', requireAuth, async (req, res) => {
    
})

// Export ------------------------------------------------------------------------
module.exports = router;
