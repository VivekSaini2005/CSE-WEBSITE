const express = require('express');
const router = express.Router();
const semesterController = require('../controllers/semester.controller');
const { protect } = require('../middleware/auth.middleware');
const isAdmin = require('../middleware/isAdmin');

router.route('/')
    .get(semesterController.getAllSemesters)
    .post(protect, isAdmin, semesterController.createSemester);

router.route('/:id')
    .put(protect, isAdmin, semesterController.updateSemester)
    .delete(protect, isAdmin, semesterController.deleteSemester);

module.exports = router;
