const Message = require("../models/messages");

const saveMessage = async({roomId, senderId, receiverId, message}) => {
    return await Message.create({
        roomId,
        senderId,
        receiverId,
        message
    })
    
}

module.exports = {saveMessage};