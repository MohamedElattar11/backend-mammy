//comments
const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comments');


router.post('/', commentController.createComment);
router.get('/:id', commentController.getAllComments);
// router.get('/comments/:id', commentController.getCommentById);
router.put('/comments/:id', commentController.updateComment);
router.delete('/comments/:id', commentController.deleteComment);

module.exports = router;
