const express = require('express');
const router = express.Router();
const achievementController = require('../controllers/achievementController');
const { protect } = require('../middleware/auth.middleware');
const isAdmin = require('../middleware/isAdmin');

router.route('/')
    .get(achievementController.getAllAchievements)
    .post(protect, isAdmin, achievementController.createAchievement);

router.route('/:id')
    .put(protect, isAdmin, achievementController.updateAchievement)
    .delete(protect, isAdmin, achievementController.deleteAchievement);

module.exports = router;
