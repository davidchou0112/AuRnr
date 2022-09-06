const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, sequelize, User, ReviewImage, Booking } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Op } = require('sequelize');

// Routes ---------------------------------------------------------------------------------
// // Get all Spots --------PROGRESS-----previewImage and avgRating------------------------
// router.get('/', async (req, res) => {
//     // pagination
//     let { size, page } = req.query

//     if (!page) page = 1
//     if (!size) size = 20

//     page = parseInt(page);
//     size = parseInt(size);

//     const pagination = {}

//     if (page >= 1 && size >= 1) {
//         pagination.limit = size
//         pagination.offset = size * (page - 1)

//     }

//     const allSpots = await Spot.findAll({
//         ...pagination
//     })
//     let spot = []

//     for (let key of allSpots) {
//         const allRating = await Review.findAll({
//             where: {
//                 spotId: key.id
//             },
//             attributes: [
//                 [sequelize.fn("AVG", sequelize.col('stars')), "avgRating"],
//             ],
//             raw: true
//         })

//         let imageUrl = await SpotImage.findByPk(key.id,
//             {
//                 where: { preview: true },
//                 attributes: ['url']
//             })

//         let data = key.toJSON()
//         // console.log(data, '---------data')
//         // console.log(allRating, '-- this is allRating')

//         data.avgRating = allRating[0].avgRating
//         data.previewImage = imageUrl.url

//         spot.push(data)
//     }
//     res.json({
//         Spots: spot,
//         page: page,
//         size: size

//     })
// });


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
        ...pagination, // need this to return ALL spots
        raw: true,
        subQuery: false

    })
    // go through spots array and see if each obj has an assoc image
    for (let spot of spotsall) {
        const spotImage = await SpotImage.findOne({
            attributes: ["url"],
            where: {
                preview: true,
                spotId: spot.id
            },
            raw: true
        })
        // if image exists, then set spotImage property in obj accordingly
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
// router.post('/:spotId/images', requireAuth, async (req, res) => {
//     const {
//         url,
//         preview
//     } = req.body

//     const { spotId } = req.params
//     const spotIdExists = await Spot.findByPk(spotId)

//     // If no spot exists
//     if (!spotIdExists) {
//         res.statusCode = 404,
//             res.json({
//                 "message": "Spot couldn't be found",
//                 "statusCode": 404
//             })
//     }

//         const addImageToSpot = await SpotImage.create({
//             "spotId": spotId,
//             "url": url,
//             preview: preview
//             // preview: { 'raw': true}
//         })
//         res.json(await SpotImage.findByPk(addImageToSpot.id, {
//             attributes: [
//                 'id',
//                 'url',
//                 'preview'
//             ]
//         }))

//     }
// )

// COME BACK TO THIS VVV

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

// // Get Details of a Spot by Id -----------User needs to show as Owner, Preview still Null??-----------------------------------
// //
// router.get('/:spotId', requireAuth, async (req, res) => {

//     // If no spot exists error
//     const spot = await Spot.findByPk(req.params.spotId, {
//         include: [
//             { model: SpotImage, attributes: ['id', 'url', 'preview'] },
//             { model: User, attributes: ['id', 'firstName', 'lastName'] }
//         ]
//     });
//     if (!spot) {
//         res.status(404)
//         res.json({
//             "message": "Spot couldn't be found",
//             "statusCode": 404
//         })
//     }

//     const countReview = await Spot.findByPk(req.params.spotId, {
//         include: {
//             model: Review,
//             attributes: [],
//         },
//         attributes: [
//             [sequelize.fn("COUNT", sequelize.col("review")), "numReviews"],
//             [sequelize.fn("AVG", sequelize.col("stars")), "avgStarRating"],
//         ],
//         raw: true
//     });
//     let spotJSON = spot.toJSON();
//     spotJSON.numReviews = countReview.numReviews;

//     const avgRating = countReview.avgStarRating;
//     spotJSON.avgStarRating = Number(avgRating).toFixed(1);

//     res.json(spotJSON);
// })

//Get details of a Spot from an id
router.get("/:spotId", async (req, res) => {
    const { spotId } = req.params;
    const spotDetails = await Spot.findByPk(spotId);

    if (!spotDetails) {
        res.status(404)
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
const owner = await User.findByPk(spotDetails.ownerId,{
    attributes:["id","firstName","lastName"]
})

const spotImages = await SpotImage.findAll({
    where:{
spotId:spotId
    },
    attributes:["id","url","preview"]
})

const numReviews = await Review.count( {
    where: {spotId: spotId},
    raw: true
})
const averageRating = await Review.findOne({
    attributes: [[sequelize.fn('ROUND',sequelize.fn("AVG", sequelize.col("stars")),2), "avgRating"]],
    where: {spotId: spotId},
    raw: true
})
const details = spotDetails.toJSON()
details.numReviews = numReviews
details.avgStarRating = averageRating.avgStarRating
details.SpotImages  = spotImages
details.Owner = owner
return res.json(details)
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

//create a booking from a spot based on the spots id ----------Error handler for existing booking doesn't work----------------------
router.post('/:spotId/bookings', restoreUser, requireAuth, async (req, res) => {
    const { spotId } = req.params
    const { user } = req
    const { startDate, endDate } = req.body

    // error if spot doesn't exist
    const spot = await Spot.findByPk(spotId)
    if (!spot) {
        res.statusCode = 404
        res.json({
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
        res.json({
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
            "spotId": spotId,
            "userId": user.id,
            startDate,
            endDate
        })
        res.json(newBooking)

    } else {
        res.statusCode = 403
        res.json({
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
      res.json({ Bookings: bookings })
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
      res.json({ Bookings: bookings })
      console.log(Booking, '-------------Bookings---------')
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
        res.json({
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
