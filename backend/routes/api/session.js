// backend/routes/api/session.js
const express = require('express');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// ---------------------------------------------------------------

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];


// Log in ---------------------------------------------------------------
router.post('/', validateLogin, async (req, res, next) => {
  const {
    credential,
    password
  } = req.body;

  const user = await User.login({ credential, password });


  if (!user) {
    res.status(401)
    res.json({
      "message": "Invalid credentials",
      "statusCode": 401
    });
  }



  const token = await setTokenCookie(res, user);
  user.token = token;


  const userInfo = {};
  userInfo.id = user.id;
  userInfo.firstName = user.firstName;
  userInfo.lastName = user.lastName;
  userInfo.email = user.email;
  userInfo.username = user.username;
  userInfo.token = token;

  return res.json({
    ...userInfo
  });
}
);


// Log out --------------------------------------------------------
router.delete('/', (_req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'success' });
}
);

// Restore session user --------------------------------------------
// router.get('/', restoreUser, async (req, res) => {
//   const {
//     user
//   } = req;

//   //     if (user) {
//   //       return res.json({
//   //         user: user.toSafeObject()
//   //       });
//   //     } else return res.json({});

//   //   }
//   // );

//   // const userInfo = await User.findByPk(user.id)

//   //   if (user) {
//   //       return res.json(userInfo);
//   //   } else return res.json({});

//   await setTokenCookie(res, user);

//   const userInfo = {};
//   userInfo.id = user.id;
//   userInfo.firstName = user.firstName;
//   userInfo.lastName = user.lastName;
//   userInfo.email = user.email;
//   userInfo.username = user.username;


//   return res.json({
//     ...userInfo
//   });


// });

router.get(
  '/',
  restoreUser,
  async (req, res) => {
    const { user } = req;
    // console.log('IN THE API SESSION ROUTE', user)
    // const currentUser = await User.findByPk(user.id)

    if (user) {
      const currentUser = await User.findByPk(user.id)
      return res.json(currentUser);
    } else {
      return res.json(null)
    };
  });

// Export -----------------------------------------------------------
module.exports = router;
