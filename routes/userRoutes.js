const express = require('express');
const { deleteUserProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router(); 
const { updateUserProfile} = require('../controllers/userController');
const { getUserProfile } = require('../controllers/userController');

// DELETE user profile route
router.delete('/delete-profile', authMiddleware, deleteUserProfile);

router.put('/update-profile', authMiddleware, updateUserProfile);

router.get('/me', authMiddleware, getUserProfile);

module.exports = router;
