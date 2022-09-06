const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, sequelize, User, ReviewImage, Booking } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Op } = require('sequelize');

// routes -----------------------------------------------------------------------------------------------
// get all current users bookings
router.get('/current', restoreUser, requireAuth, async (req, res) => {
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


//Edit a Booking -----------------------------------------------------------------------------------------
router.put('/:bookingId', restoreUser, requireAuth, async (req, res, next) =>{
    const {startDate, endDate} = req.body
    const {bookingId} = req.params
    const {user} = req
   const editBooking = await Booking.findByPk(bookingId)

   if(!editBooking){
    res.statusCode = 404
    res.json({
        "message": "Booking couldn't be found",
        "statusCode": 404
    })
   }
   if(editBooking.userId !== user.id) {
    res.status(403)
    res.json({
        "message": "Booking must belong to the current user",
        "statusCode": 403
    })
   }
   if (endDate < startDate || !endDate || !startDate) {
    res.statusCode = 400
        res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "endDate": "endDate cannot come before startDate"
            }
        })
}
let today = new Date().toISOString().slice(0, 10)

if (startDate < today || endDate < today || startDate > endDate) {
    res.statusCode = 403
        res.json({
            "message": "Past bookings can't be modified",
            "statusCode": 403
        })
}

let spotId = editBooking.spotId
const startDateConflict = await Booking.findAll({
   where:{
        [Op.and]: [
            {spotId: spotId },
            // {startDate: startDate },
                { [Op.or]: [{
                    startDate:{
                        [Op.between]: [startDate, endDate]
                    }
                }, {
                    endDate:{
                        [Op.between]: [startDate, endDate]
                    }
                   }]
                }
        ]
    },
})
// console.log('startDateConflict.length: ', startDateConflict.length)

if (startDateConflict.length > 1) {
    res.statusCode = 403
    res.json({
        "message": "Sorry, this spot is already booked for the specified dates",
        "statusCode": 403,
        "errors": {
            "startDate": "Start date conflicts with an existing booking",
            "endDate": "End date conflicts with an existing booking"
        }
    })
    // Booking must belong to the current user

}

if (user.id === editBooking.userId) {

    editBooking.set({
        startDate,
        endDate
    })

    await editBooking.save()

    return res.json(editBooking)

}
})


// delete booking ---------------------------------------------------------------------------------------
router.delete('/:bookingId', requireAuth, async(req, res, next) => {
    const {bookingId} = req.params
    const {user} = req
    let today = new Date().toISOString().slice(0, 10)

    const deleteBooking = await Booking.findByPk(bookingId)
    if(!deleteBooking){
        res.statusCode = 404
        res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
          })
    }
    if(deleteBooking.startDate < today ||  deleteBooking.endDate < today){
        res.statusCode = 403
        res.json({
            "message": "Bookings that have been started can't be deleted",
            "statusCode": 403
        })

} else if (deleteBooking.userId === user.id){

    await deleteBooking.destroy()

    res.statusCode = 200
    return res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
} else {

    res.status(403)
         res.json( {
        "message": "Booking must belong to the current user or the Spot must belong to the current user",
        "statusCode": 403
    })
}

})
// export -----------------------------------------------------------------------------------------------
module.exports = router;
