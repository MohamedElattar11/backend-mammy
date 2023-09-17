const express = require('express');
const router = express.Router();
const BlogsController  = require('../controllers/BlogPost');
router.post('/add',BlogsController.upload.single('image') , BlogsController.createBlog)
router.get('/get',BlogsController.getAllBlogs) 
router.get('/:id', BlogsController.getBlog)
router.patch('/:id', BlogsController.updateBlog)
router.delete('/:id',BlogsController.deleteBlog)

module.exports = router;
