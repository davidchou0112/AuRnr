const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, sequelize, User, ReviewImage } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// Routes -----------------------------------------------------------------------------------
// Create an Image for a Review ----Done-------------------------------------------------------------------
// based on reviewId
router.post("/:reviewId/images", requireAuth, async (req, res) => {
    const { reviewId } = req.params
    const { url } = req.body

    // error if no review exists
    const review = await Review.findByPk(reviewId)
    if (!review) {
        res.status(404)
        res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }

    // can only have a maximum of 10 images
    const imageCount = await ReviewImage.count({ where: { reviewId: review.id } })
    console.log(imageCount, '-------------this is count-----------')
    if (imageCount > 10) {
        res.status(403)
        res.json({
            "message": "Maximum number of images for this resource was reached",
            "statusCode": 403
        })
    }


    const newImage = await ReviewImage.create({
        url,
        reviewId: review.id
    })
    const reviewImage = await ReviewImage.findByPk(newImage.id, {
        attributes: [
            "id",
            "url"
        ]
    })

    return res.json(reviewImage)
})

// Get Reviews of Current User -- Unable to read previewImage URL---2nd User shows up??----------------------------------------------------------
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req

    let result = []
    const currentReview = await Review.findAll({
        where: {
            userId: user.id
        },
        include: [
            {
                model: User,
                attributes: [
                    'id',
                    'firstName',
                    'lastName'
                ]
            },
            {
                model: Spot,
                attributes: {
                    exclude: [
                        'description',
                        'createdAt',
                        'updatedAt'
                    ]
                }
            },
            {
                model: ReviewImage,
                attributes: [
                    'id',
                    'url'
                ]
            }
        ]
    })

    for (let review of currentReview) {
        let spotimage = await SpotImage.findByPk(review.id, { where: { preview: true }, attributes: ['url'], raw: true })
        let reviewInfo = review.toJSON()
        reviewInfo.Spot.previewImage = spotimage
        result.push(reviewInfo)
    }
    res.json({ Reviews: result })
})

// Edit a Review ---------------------------------------------------------------------------------
router.put('/:reviewId', requireAuth, async (req, res) => {
    const {
        review,
        stars
    } = req.body
    const { reviewId } = req.params
    const { user } = req

    const reviewEdit = await Review.findByPk(reviewId)

    if (!reviewEdit) {
        res.statusCode = 404
        res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }

    if (reviewEdit.userId !== user.id) {
        res.statusCode = 403
        res.json({
            "message": "Review must belong to the current user",
            "statusCode": 403
        })
    }

    reviewEdit.set({
        review,
        stars
    })

    await reviewEdit.save()
    res.json(reviewEdit)
})

// Delete a review --------------------------------------------------------------------------
router.delete('/:reviewId', restoreUser, requireAuth, async (req, res, next) => {
    const { reviewId } = req.params
    const { user } = req
    const deleteReview = await Review.findByPk(reviewId)
    if (!deleteReview) {
        res.statusCode = 404
        res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }
    if (deleteReview.userId === user.id) {
        await deleteReview.destroy()
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    } else {
        res.statusCode = 403
        res.json({
            "message": "Review must belong to the current user",
            "statusCode": 403
        })
    }
})
// Export --------------------------------------------------------------------------------
module.exports = router;
