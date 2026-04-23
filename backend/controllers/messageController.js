const Message = require("../models/messages");
const Chat = require("../models/Chats");

const sendMessage = async(req, res) => {
    const { chatId, text } = req.body;
    const senderId = req.user.id;

    try{
        const message = await Message.create({
            chatId,
            senderId,
            text
        })

        const participants = chatId.split("_");

        //create new chat when user first sends a message or update if existss
        const chat = await Chat.findByIdAndUpdate(chatId,
            {
                $set: {
                    lastMessage: text,
                    lastMessageAt: new Date()
                },
                $setOnInsert: {
                    participants
                }
            },
            {upsert: true, new: true}
        );

        res.json({message, chat});

    }catch(error){
        res.status(500).json({message: "Error snding message", error: error.message});
    }
}

const getMessages = async(req, res) => {
    const { chatId } = req.body;

    try{
        const msgs = await Message.find({chatId});
        if(!msgs){
            res.status(404).json({message: "messages not found for this chat"});
        }
        res.status(200).json(msgs);
    }catch(error){
        console.log("Error getting messages", error);
        res.status(500).json({error: "Internal server error"});
    }
}



module.exports = { sendMessage, getMessages };