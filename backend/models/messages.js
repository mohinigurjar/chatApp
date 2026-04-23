const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    chatId: {
        type: String,
        required: true,
        index: true,
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId, //its the id of sender the unique id
        ref: 'User',  //referencing the User model means the data(id) fetched from the User collection
        required: true  
    },
    text: {
        type: String,
        required: true,
    }
}, {timestamps: true});

    const Message = mongoose.model('Message', messageSchema);
    module.exports = Message;