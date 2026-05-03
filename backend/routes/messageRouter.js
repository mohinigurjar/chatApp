const express = require( "express");
const { sendMessage } = require("../controllers/messageController");
const { getMessages } = require("../controllers/messageController")
const { userAuth } = require('../middlewares/userAuth.js');
const { messageLimiter } = require('../middlewares/rateLimit.js');

const router = express.Router();


router.post('/send', userAuth, messageLimiter, sendMessage);
router.post('/getAll', getMessages);
module.exports = router;