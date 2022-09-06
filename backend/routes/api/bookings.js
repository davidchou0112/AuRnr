const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, sequelize, User, ReviewImage, Booking } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Op } = require('sequelize');

// routes -----------------------------------------------------------------------------------------------
// get all current users bookings
router.get('/current', requireAuth, async (req, res) => {
    const bookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: Spot,
                attributes: [
                    'id',
                    'ownerId',
                    'address',
                    'city',
                    'state',
                    'country',
                    'lat',
                    'lng',
                    'name',
                    'price'
                ]
            },
        ]
    })

    for (let i = 0; i < bookings.length; i++) {
        let previewImg = bookings[i].toJSON();

        let preview = previewImg.Spot.id;
        const bookingSpotImage = await SpotImage.findOne({
            where: {
                spotId: preview,
                preview: true
            }
        })

        if (bookingSpotImage) {
            previewImg.Spot.previewImage = bookingSpotImage.url
        } else {
            previewImg.Spot.previewImage = 'No image'
        }
        bookings[i] = previewImg
    }

    res.json({ Bookings: bookings })
})

// export -----------------------------------------------------------------------------------------------
module.exports = router;
