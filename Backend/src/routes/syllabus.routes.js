const express = require('express');
const router = express.Router();
const syllabusController = require('../controllers/syllabus.controller');
const { protect } = require('../middleware/auth.middleware');
const isAdmin = require('../middleware/isAdmin');

router.route('/')
    .get(syllabusController.getAllSyllabus)
    .post(protect, isAdmin, syllabusController.createSyllabus);

router.route('/:id')
    .put(protect, isAdmin, syllabusController.updateSyllabus)
    .delete(protect, isAdmin, syllabusController.deleteSyllabus);

module.exports = router;
