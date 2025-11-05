const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.get('/profiles/:id', profileController.getProfile);
router.post('/profiles', profileController.createProfile);
router.put('/profiles/:id', profileController.updateProfile);

module.exports = router;
