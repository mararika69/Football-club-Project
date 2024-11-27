const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register a new user
exports.registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ msg: 'Invalid email format' });
    }

    // Validate password length
    if (password.length < 8) {
      return res.status(400).json({ msg: 'Password must be at least 8 characters' });
    }

    // Check if email is already registered
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'Email already registered' });
    }

    // Create and save the new user
    user = new User({ 
      username, 
      email, 
      password, 
      role: role || 'user',
    });
    await user.save();

    // Return the username and email in the response
    res.status(201).json({
      msg: 'User registered successfully',
      user: {
        username: user.username,
        email: user.email,
        password: user.password,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};


// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({
      msg: 'Login successful',
      user:{
        id:user.id,
        username:user.username,
        email:user.email,
        role:user.role,
      },
      token: token,
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};
