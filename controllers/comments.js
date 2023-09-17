//comments controller
const Comment = require("../Models/comments");

// Create a new comment
const createComment = async (req, res) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

// Get all comments
const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({blogPost: req.params.id})
      .populate("author", "name")
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
    console.log(error)
  }
};

// Get a single comment by ID
const getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)
      .populate("author", "username")
      .populate("blogPost", "title");
    if (!comment) {
      res.status(404).json({ error: "Comment not found" });
    } else {
      res.json(comment);
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

// Update a comment
const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate("author", "username")
      .populate("blogPost", "title");
    if (!comment) {
      res.status(404).json({ error: "Comment not found" });
    } else {
      res.json(comment);
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

// Delete a comment
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
      res.status(404).json({ error: "Comment not found" });
    } else {
      res.json({ message: "Comment deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = {
  createComment,
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment,
};
