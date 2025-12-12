const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

// Example protected route for after-login homepage
router.get('/homepage', verifyToken, (req, res) => {
  res.json({
    message: `Welcome ${req.user.username}! This is your after-login homepage.`,
    user: req.user
  });
});

module.exports = router;
