const express = require('express');
const router = express.Router();
const alumniController = require('../controllers/alumni.controller');
const { protect } = require('../middleware/auth.middleware');
const isAdmin = require('../middleware/isAdmin');

router.route('/')
    .get(alumniController.getAllAlumni)
    .post(protect, isAdmin, alumniController.createAlumni);

router.route('/:id')
    .get(alumniController.getAlumniById)
    .put(protect, isAdmin, alumniController.updateAlumni)
    .delete(protect, isAdmin, alumniController.deleteAlumni);

module.exports = router;
