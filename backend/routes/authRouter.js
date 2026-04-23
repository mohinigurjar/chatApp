const express = require('express');
const validate = require('../middlewares/validate.js');
const { userAuth } = require('../middlewares/userAuth.js');
const { signUpValidator, loginValidator } = require("../utils/userValidation.js")
const { signUpUser, loginUser, logoutUser } = require('../controllers/authController.js');

const router = express.Router();

router.post('/signup', validate(signUpValidator), signUpUser);
router.post('/login', validate(loginValidator), loginUser);
router.post('/logout', userAuth, logoutUser);

module.exports = router;