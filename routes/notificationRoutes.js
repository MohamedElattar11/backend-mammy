const express = require('express');
const router = express.Router();
const controller = require('../controllers/notificationController');

router.post('/create', controller.createNotification);
router.delete('/:id', controller.deleteNotification);
router.get('/getAll', controller.getAllNotifications);

module.exports = router;
