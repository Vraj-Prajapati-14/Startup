const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

// Simple admin user (in production, use a proper User model)
const ADMIN_USER = {
  email: process.env.ADMIN_EMAIL || 'admin@bacancy.com',
  password: process.env.ADMIN_PASSWORD || '$2a$10$your_hashed_password_here'
};

// @route   POST /api/auth/login
// @desc    Admin login
// @access  Public
router.post('/login', [
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password is required').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    // Check if user exists
    if (email !== ADMIN_USER.email) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    // const isMatch = await bcrypt.compare(password, ADMIN_USER.password);
    // if (!isMatch) {
    //   return res.status(400).json({ message: 'Invalid credentials' });
    // }
    if (password !== ADMIN_USER.password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const payload = {
      user: {
        id: 'admin',
        email: ADMIN_USER.email
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/auth/verify
// @desc    Verify JWT token
// @access  Private
router.get('/verify', async (req, res) => {
  try {
    const token = req.header('x-auth-token');

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    res.json({ valid: true, user: decoded.user });
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
});

module.exports = router; 