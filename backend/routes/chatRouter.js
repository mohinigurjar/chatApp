const express = require("express");
const { userAuth } = require("../middlewares/userAuth");
const { getChatsList, createChat } = require("../controllers/chatController");
const router = express.Router();

router.get('/chatsList', userAuth, getChatsList);

module.exports = router;