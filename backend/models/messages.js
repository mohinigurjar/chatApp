const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true  
    },
    reciever: {
        type: mongoose.Schema.Types.ObjectId, //its the id of rcvr the unique id
        ref: 'User', //referencing the User model means the data(id) fetched from the User collection
        required: true  
    },
    message: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    });

    const Message = mongoose.model('Message', messageSchema);
    module.exports = Message;