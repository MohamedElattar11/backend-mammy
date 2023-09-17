const express = require('express');
const Notification = require('../Models/notification');
const io = require('../Socket').get();

const app = express();

// Initialize the socket.io instance


// Create a new notification
exports.createNotification = async (req, res) => {
    const { message } = req.body;

    try {
        const notification = await Notification.create({ message });
        const deletionTime = req.body.deletionTime;



        //-------------------------------------


        const newNotification = {
            _id: notification._id,
            message: notification.message,
            createdAt: notification.createdAt,
            source: 'backend', // Set the source as 'backend'
            deletionTime: deletionTime, // Convert deletionTime to milliseconds
        };

        io.emit('newNotification', newNotification);

        io.on('disconnect', () => {
            console.log('Client disconnected');
        });

        //-------------------------------------------------------

        res.send('Notification created successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send(`Failed to create notification: ${error.message}`);
    }
};

// Get all notifications
exports.getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find();
        res.send(notifications);
    } catch (error) {
        console.error(error);
        res.status(500).send(`Failed to fetch notifications: ${error.message}`);
    }
};

// Delete a notification
exports.deleteNotification = async (req, res) => {
    const { notificationId } = req.params;

    try {
        const notification = await Notification.findByIdAndDelete(notificationId);

        // Emit a 'notificationDeleted' event to the specific client identified by the userId
        io.to(notification.userId).emit('notificationDeleted', notification);

        res.send('Notification deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send(`Failed to delete notification: ${error.message}`);
    }
};
