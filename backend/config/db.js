const mongoose = require('mongoose');

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('db connection established');

    }catch(err) {
        console.error('db connection error', err);
    }
    
};

module.exports = connectDB;