// backend/routes/homepage.js
const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const User = require('../models/user.js');

const router = express.Router();

// Protected route
router.get('/', verifyToken, async (req, res) => {
  try {
    // req.user is set by verifyToken middleware
    const userId = req.user.id;
    const user = await User.findById(userId).select('username email');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ username: user.username });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
