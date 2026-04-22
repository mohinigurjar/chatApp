const express = require('express');
const { getUserProfile, editUserProfile, deleteUserProfile, getAllUsersDetails, changePassword} = require('../controllers/userController.js');
const { userAuth } = require('../middlewares/userAuth.js');
const { updateProfileValidator, changePasswordValidator } = require('../utils/userValidation.js')
const validate = require('../middlewares/validate.js');

const router = express.Router();

router.get('/me', userAuth, getUserProfile);
router.patch('/edit', userAuth, validate(updateProfileValidator), editUserProfile);
router.delete('/delete', userAuth, deleteUserProfile);
router.patch('/changePassword', userAuth, validate(changePasswordValidator), changePassword);
router.post('/bulk', getAllUsersDetails);

module.exports = router;