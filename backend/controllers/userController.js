const User = require('../models/users.js');
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const getUserProfile = async(req, res) => {

    const userId = req.user.id;

    try{
        const user = await User.findOne({ _id: userId});
        if(!user){
            return res.status(404).json({message: 'user not found'});
        }
        else{
            return res.status(200).json({messsage: 'user details', user});
        }
    }catch(error) {
        return res.status(400).send({"ERROR: ": + error.message})
    }
}

const editUserProfile = async(req, res) => {
    const userId = req.user.id;
    const { newname } = req.body;

    try{
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({error: "User not found"});
        }

        user.username = newname;
        await user.save();
        res.status(200).json({message: "Profile successfully updated: ", user});   
    }catch(error) {
        res.status(500).json({error: "Internal Server error"});
    }
}

const deleteUserProfile = async(req, res) => {
    const userId = req.user.id;

    try{
        const deletedUser = await User.findByIdAndDelete(userId);
        if(!deletedUser){
            res.status(404).json({error: "User not found"});
        }
        res.status(200).json({message: "User deleted successfully", deletedUser});
    }catch(error){
        res.status(500).json({error: "Internal server error"});
    }
}

const changePassword = async(req, res) => {
    const userId = req.user.id;
    
    const { oldPassword, newPassword } = req.body;

    console.log("resetting password");

    try{
        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({error: "User not found"});
        }

        console.log(user);

        const isPasswordValid = await user.validatePassword(oldPassword);
        if(!isPasswordValid){
            res.status(400).json({message: "Invalid old password"});
        }

        if (oldPassword === newPassword) {
            return res.status(400).json({ message: "New password must be different from old password"});
        }

        console.log(oldPassword, newPassword);

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        console.log(user);

        await user.save();
        return res.status(200).json({message: "Password updated successfully"});
        
    }catch(error){
        res.status(500).json({error: "Internal server error"});
    }
}

const getAllUsersDetails = async(req, res) => {

    const { ids } = req.body;

    try{
        if (!Array.isArray(ids)) {
            return res.status(400).json({ error: "ids must be an array" });
        }

        //prevent from getting bad ids like [], [{}] as they crash during query
        const validIds = ids.filter((id) => 
        mongoose.Types.ObjectId.isValid(id)
        );

        if (validIds.length === 0) {
            return res.status(400).json({ error: "No valid user IDs provided" });
        }

        const users = await User.find({
            _id: { $in: validIds }
        });

        res.status(200).json(users);
    }catch(error){
        console.log(error);
        res.status(500).json({error: error.message});
    }
}

module.exports = { getUserProfile, editUserProfile, deleteUserProfile, getAllUsersDetails, changePassword};
