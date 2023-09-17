const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const BlogPost = require('../Models/BlogPost');
const multer = require('multer');
const date = require('date-and-time');
const blogPost = require('../Models/BlogPost');



// Configure multer for file storage
const fileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads/');
  },
  filename: (req, file, callback) => {
    const fileName = Date.now() + file.originalname.replace(/ /g, '');
    callback(null, fileName);
  }
});
exports.upload = multer({ storage: fileStorage });


// Create a new blog post
exports.createBlog= async (req, res) => {
console.log(req.body)
  try {
    const blogPost = new BlogPost({
      title: req.body.title,
      content: req.body.content,
      user: req.body.author,
      image: req.file.filename,
    });
    const savedBlogPost = await blogPost.save();
    console.log(savedBlogPost)
    res.status(201).json(savedBlogPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all blog posts
exports.getAllBlogs= async (req, res) => {
  try {
    const blogPosts = await BlogPost.find();
    res.json(blogPosts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single blog post
exports.getBlog= async (req, res) => {
 
  try {
    const _id = req.params.id
    console.log(_id)
    const blog = await blogPost.findById(_id).populate('user',"name image")
    res.send(blog)
  }catch (error) {
    console.log(error)
  }
}
 


// Update a blog post
exports.updateBlog= async (req, res) => {
  if (req.body.title != null) {
    res.blogPost.title = req.body.title;
  }

  if (req.body.content != null) {
    res.blogPost.content = req.body.content;
  }

  try {
    const updatedBlogPost = await res.blogPost.save();
    res.json(updatedBlogPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a blog post
exports.deleteBlog= async (req, res) => {
  try {
    await res.blogPost.remove();
    res.json({ message: 'Blog post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Middleware function to get a single blog post by ID
 exports.getBlogPostasync = async(req, res, next) =>{
  try {
    console.log(req.params.id)
    const blogPost = await BlogPost.findById(req.params.id).populate('author');
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
exports.authenticateToken = async(req, res, next) => {
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

