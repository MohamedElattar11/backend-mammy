const express = require('express');

const controllers = require('../controllers/userController');

const router = express.Router();


router.get('/mothers-per-day', controllers.getMotherRegisteredPerDay);
router.get('/pregnant-per-day', controllers.getPregnantRegisteredPerDay);
router.get('/seller-per-day', controllers.getSellerRegisteredPerDay);

module.exports = router
