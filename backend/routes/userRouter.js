const express = require('express');
const {registerSchema, loginSchema} = require('../schemas/user.schema.js');
const sendMessage = require('../controllers/messageController.js')
const {createUser, loginUser} = require('../controllers/userController.js');
const validate = require('../middlewares/validate.js');
const { userAuth } = require('../middlewares/userAuth.js')


const router = express.Router();

router.post('/signup', validate(registerSchema), createUser);
router.post('/login', validate(loginSchema), loginUser);
// router.post('/sendMessage', userAuth, sendMessage);

module.exports = router;