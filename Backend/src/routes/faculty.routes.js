const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/faculty.controller');
const { protect } = require('../middleware/auth.middleware');
const isAdmin = require('../middleware/isAdmin');

router.route('/')
    .get(facultyController.getAllFaculty)
    .post(protect, isAdmin, facultyController.createFaculty);

router.route('/:id')
    .get(facultyController.getFacultyById)
    .put(protect, isAdmin, facultyController.updateFaculty)
    .delete(protect, isAdmin, facultyController.deleteFaculty);

module.exports = router;
