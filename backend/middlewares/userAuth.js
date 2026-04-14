const User = require("../models/users");
const jwt = require("jsonwebtoken");

const userAuth = async(req, res, next) => {
    try{
        const cookies = req.cookies;
        const { token } = cookies;
        if(!token) {
            throw new Error('Invalid Token');
        }

        // decoding to get the payload ultimately the user id
        const decodedObj = await jwt.verify(token, process.env.JWT_SECRET);

        const { id } = decodedObj;

        const user = await User.findById(id);
        
        if(!user){
            throw new Error("User not found");
        }

        req.user = user;
        next();
    }catch(error){
        res.status(400).send("ERROR: " + error.message);
    }
}

module.exports = {userAuth};