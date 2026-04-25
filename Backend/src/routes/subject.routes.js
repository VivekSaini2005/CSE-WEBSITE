const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subject.controller');
const { protect } = require('../middleware/auth.middleware');
const isAdmin = require('../middleware/isAdmin');

router.route('/')
    .get(subjectController.getAllSubjects)
    .post(protect, isAdmin, subjectController.createSubject);

router.route('/:id')
    .put(protect, isAdmin, subjectController.updateSubject)
    .delete(protect, isAdmin, subjectController.deleteSubject);

module.exports = router;
