const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    roomId: {
        type: String,
        required: true,
        index: true,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true  
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId, //its the id of rcvr the unique id
        ref: 'User', //referencing the User model means the data(id) fetched from the User collection
        required: true  
    },
    message: {
        type: String,
        required: true,
    }
    }, {timestamps: true});

    const Message = mongoose.model('Message', messageSchema);
    module.exports = Message;