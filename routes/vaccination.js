const express = require('express');
const router = express.Router();

const vaccinationController = require('../controllers/vaccinationController');

// Dashboard Page 
//Add a vaccinationnn 
router.post('/add', vaccinationController.createVaccination);
// get  vaccines
router.get('/getAll', vaccinationController.getAllVaccines);
// get a vaccine by ID
router.get('/:vaccinationId', vaccinationController.getVaccineById);
// Update a vaccination
router.put('/:vaccinationId', vaccinationController.updateVaccination);
// Delete a vaccination
router.delete('/:vaccinationId', vaccinationController.deleteVaccination);

//---------------------------------------------------------------------------------------------------

//only get in mother profile
// router.get('/user/:motherId', vaccinationController.getVaccinationsForMother);
router.get('/:userId/:babyId', vaccinationController.getVaccinationsForBaby);
router.patch('/:userId/:babyId', vaccinationController.updateVaccineForBaby);

module.exports = router;
