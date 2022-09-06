const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, sequelize, User, ReviewImage, Booking } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Op } = require('sequelize');

// delete spot image -------------------------------------------------------------------------------------
router.delete('/:imageId', requireAuth, async (req, res) => {
    const { imageId } = req.params
    const { user } = req

    const image = await SpotImage.findByPk(imageId, {
      include: {
        model: Spot
      }
    })

    if (!image) {
      res.status(404)
      return res.json({
        "message": "Spot Image couldn't be found",
        "statusCode": 404
      })
    }

    if (image.Spot.ownerId !== user.id) {
      res.status(403)
      return res.json({
        "message": "Forbidden. This is NOT your property!!",
        "statusCode": 403
      })
    }

    await image.destroy()

    return res.json({
      "message": "Successfully deleted",
      "statusCode": 200
    })
  })

// Export ------------------------------------------------------------------------------------------------
module.exports = router;
