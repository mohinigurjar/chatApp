const User = require('../models/users.js');
const bcrypt = require('bcrypt');

const signUpUser = async(req, res) => {
    const {username, email, password} = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({username, email, password: hashedPassword});
        await newUser.save();
        return res.status(201).json({message: 'User created successfully', user: newUser});
    }catch(err) {
        return res.status(500).json({error: 'Internal Server Error'});
    }
}

const loginUser = async(req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if(!user) {
            return res.status(404).json({error: 'User not found'});
        }
        const isPasswordValid = await user.validatePassword(password);
       
        if(isPasswordValid) {
            //if credentials are valid, generate JWT token
            const token = await user.getJWT();

            //store token in cookie                                                                      //secure: true for production with https
            res.cookie('token', token, {expires : new Date(Date.now() + 7 * 86400000)}, {httpOnly: true, secure: false, sameSite: 'lax'});
            return res.status(200).json({message: 'Login successful', token});
            
        }else{
            return res.status(401).json({error: 'Invalid credentials'});
        }
    }catch(error) {
        console.log(error);
        return res.status(400).send({"ERROR ": + error.message});
    }
}

const logoutUser = async(req, res) => {
    res.clearCookie("token");
    res.send("Logout successfully");

}

module.exports = { signUpUser, loginUser, logoutUser}