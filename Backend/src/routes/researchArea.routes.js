const express = require('express');
const router = express.Router();
const researchAreaController = require('../controllers/researchArea.controller');
const { protect } = require('../middleware/auth.middleware');
const isAdmin = require('../middleware/isAdmin');

router.route('/')
    .get(researchAreaController.getAllResearchAreas)
    .post(protect, isAdmin, researchAreaController.createResearchArea);

router.route('/:id')
    .put(protect, isAdmin, researchAreaController.updateResearchArea)
    .delete(protect, isAdmin, researchAreaController.deleteResearchArea);

module.exports = router;
