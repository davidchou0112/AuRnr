// backend/routes/api/users.js
const express = require("express");
const router = express.Router();

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username")
    .not()
    .isEmail()
    .withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors
];



// Sign up
router.post("/", validateSignup, async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    username
  } = req.body;

  const existingEmail = await User.findOne({
    where: { email }
  });

  const existingUsername = await User.findOne({
    where: { username }
  });

  // If email already exists
  if (existingEmail) {
    res.status(403)
    res.json({
      "message": "User already exists",
      "statusCode": 403,
      "errors": {
        "email": "User with that email already exists"
      }
    })
    // if username already exists
  } else if (existingUsername) {
    res.status(403)
    res.json({
      "message": "User already exists",
      "statusCode": 403,
      "errors": {
        "username": "User with that username already exists"
      }
    });
    // Create new user
  } else {
    const user = await User.signup({
      firstName,
      lastName,
      email,
      username,
      password
    });


    // Response body
    await setTokenCookie(res, user);

    const userInfo = {};
    userInfo.id = user.id;
    userInfo.firstName = user.firstName;
    userInfo.lastName = user.lastName;
    userInfo.email = user.email;
    userInfo.username = user.username;
    userInfo.token = "";

    return res.json({
      ...userInfo
    });
  }
}
);





module.exports = router;
