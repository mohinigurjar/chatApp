const express = require( "express");
const { sendMessage } = require("../controllers/messageController");
const { getMessages } = require("../controllers/messageController")


const router = express.Router();


router.post('/sendMessage', sendMessage);
router.post('/getMessages', getMessages);

module.exports = router;