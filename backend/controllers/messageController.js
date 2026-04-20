const Message = require("../models/messages");
const {saveMessage} = require("../services/messageService")

const sendMessage = async(req, res) => {
    const { roomId, message } = req.body;

    const saved = await saveMessage({
        roomId,
        senderId: req.user.id,
        receiverId: req.body,
        message
    })

    res.json(saved);
}

const getMessages = async(req, res) => {
    const {roomId} = req.body;

    try{
        const msgs = await Message.find({roomId});
        res.status(200).json(msgs);
    }catch(error){
        console.log("Error getting messages", error);
        res.status(500).json({error: "Internal server error"});
    }
}

module.exports = { sendMessage, getMessages };