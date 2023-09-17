const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../Models/Users');
const config = require('../config/config');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const loginAuth = express.Router();
const secretKey = 'test';

// Authentication middleware
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Authorization token not found' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    User.findById(decoded.userId, (err, user) => {
      if (err || !user) {
        return res.status(401).json({ error: 'Invalid token' });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Enable CORS
loginAuth.use(cors());
loginAuth.use(express.json());
loginAuth.use(cookieParser());

// Login endpoint
loginAuth.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Hash and salt the password
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Compare the hashed password with stored password hash
  const isPasswordValid = bcrypt.compareSync(password, hashedPassword);

  if (username === 'admin' && isPasswordValid) {
    const token = jwt.sign({ username }, secretKey);
    res.cookie('token', token, { httpOnly: true });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid username or password' });
  }
});

// Protected route example
loginAuth.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Protected route accessed successfully', user: req.user });
});

module.exports = loginAuth;
