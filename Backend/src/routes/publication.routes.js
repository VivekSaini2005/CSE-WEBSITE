const express = require('express');
const router = express.Router();
const publicationController = require('../controllers/publication.controller');
const { protect } = require('../middleware/auth.middleware');
const isAdmin = require('../middleware/isAdmin');

router.route('/')
    .get(publicationController.getAllPublications)
    .post(protect, isAdmin, publicationController.createPublication);

router.route('/:id')
    .get(publicationController.getPublicationById)
    .put(protect, isAdmin, publicationController.updatePublication)
    .delete(protect, isAdmin, publicationController.deletePublication);

module.exports = router;
