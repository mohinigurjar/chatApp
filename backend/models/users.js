const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true});

userSchema.methods.validatePassword = async function(passwordInputByUser) {
    const user = this;
    const hashedPassword = this.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, hashedPassword);
    return isPasswordValid;
}
userSchema.methods.getJWT = async function() {
    const user = this;
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
    return token;

}

const User = mongoose.model('User', userSchema);
module.exports = User;