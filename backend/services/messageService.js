const Message = require("../models/messages");

const saveMessage = async({roomId, sender, receiver, message}) => {
    return await Message.create({
        roomId,
        sender,
        receiver,
        message
    })
    
}

module.exports = {saveMessage};