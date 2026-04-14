const Message = require("../models/messages");
const saveMessage = require("../services/messageService")

const sendMessage = async(req, res) => {
    const { roomId, message } = req.body;

    const saved = await saveMessage({
        roomId,
        sender: req.user.id,
        receiver: req.body,
        message
    })

    res.json(saved);

}

module.exports = sendMessage;