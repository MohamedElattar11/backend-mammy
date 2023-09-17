const jwt = require('jsonwebtoken');
const config = require('../config/config');
const user = require('../Models/Users');
const BlogPost = require('../Models/BlogPost');

const cookieParser = require('cookie-parser');

function authMiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Authorization token not found' });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    user.findById(decoded.userId, (err, user) => {
      if (err || !user) {
        return res.status(401).json({ error: 'Invalid token' });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}





getBlogPostasync = async(req, res, next) =>{
  try {
    const blogPost = await BlogPost.findById(req.params.id).populate('author', 'name');
    if (blogPost == null) {
      return res.status(404).json({ message: 'Cannot find blog post' });
    }
    res.blogPost = blogPost;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// Middleware function to authenticate a JWT token
authenticateToken = async(req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, "hagar", (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    req.user = user;
    next();
  });
}







module.exports = {authMiddleware ,getBlogPostasync , authenticateToken } ;
