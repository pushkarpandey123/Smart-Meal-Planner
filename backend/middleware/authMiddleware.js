// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

/**
 * Middleware to verify JWT token for protected routes
 */
const verifyToken = (req, res, next) => {
  // Get the Authorization header
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'Access Denied: No token provided' });
  }

  // Format: "Bearer <token>"
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access Denied: Invalid token' });
  }

  try {
    // Verify token using JWT_SECRET from .env
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Store decoded user info in req.user for use in routes
    req.user = verified;

    // Proceed to next middleware or route handler
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = verifyToken;
