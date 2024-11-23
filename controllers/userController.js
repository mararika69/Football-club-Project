const User = require('../models/User');
const jwt = require('jsonwebtoken');
// Delete user account
exports.deleteUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from middleware
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    await User.findByIdAndDelete(userId); // Delete the user

    res.status(200).json({ msg: 'User account deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};


// Update user profile
exports.updateUserProfile = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userId = req.user.id;

    // Build an object with the updated fields
    const updatedData = {};
    if (username) updatedData.username = username;
    if (email) updatedData.email = email;
    if (password) {
      const bcrypt = require('bcryptjs');
      updatedData.password = await bcrypt.hash(password, 10);
    }

    // Find user by ID and update
    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true, // Return the updated user
      runValidators: true, // Ensure validators (e.g., email format) are applied
    });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json({ msg: 'Profile updated successfully', user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Fetch user profile details
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Get the user ID from the JWT token (middleware)

    // Find the user by ID and exclude the password field
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};