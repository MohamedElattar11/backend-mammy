const mongoose = require('mongoose');
const user = require('./Users'); // Import User model
const blogPost = require('./BlogPost'); // Import BlogPost model

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  blogPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'blogPosts',
    required: true
  },
  date : {
    type:  Date,
    default: Date.now()
  }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
