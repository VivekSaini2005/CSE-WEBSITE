const express = require('express');
const router = express.Router();
const guideController = require('../controllers/guide.controller');
const { protect } = require('../middleware/auth.middleware');
const isAdmin = require('../middleware/isAdmin');

router.route('/')
    .get(guideController.getAllGuides)
    .post(protect, isAdmin, guideController.createGuide);

router.route('/:id')
    .get(guideController.getGuideById)
    .put(protect, isAdmin, guideController.updateGuide)
    .delete(protect, isAdmin, guideController.deleteGuide);

module.exports = router;
