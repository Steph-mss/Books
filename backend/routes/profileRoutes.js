const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.get('/profiles/:userId', profileController.getProfile);
router.post('/profiles', profileController.createProfile);
router.put('/profiles/:userId', profileController.updateProfile);

module.exports = router;
