const Chat = require("../models/Chats");

//get array of all chats user part of
const getChatsList = async(req, res) => {
    const userId = req.user.id;

    try{
        const chats = await Chat.find({
        participants: userId
        })
        .populate("participants", "username _id")
        .sort({ lastMessageAt: -1 })

        res.json(chats);

        }catch(error){
            res.status(500).json({message: "Error fetching chats"});
        }
}

module.exports = { getChatsList };