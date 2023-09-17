const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');


router.post('/add',todoController.addTask);
router.get('/:id', todoController.getAllTasks);
router.patch('/:id',todoController.editTask);
router.delete('/:id',todoController.delTask);

module.exports = router;

