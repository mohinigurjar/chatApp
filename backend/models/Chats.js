const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    _id: {
        type: String,
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    lastMessage: {
        type: String,
        default: ""
    },
    lastMessageAt: {
        type: Date,
        default: Date.now()
    }
}, {timestamps: true});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;