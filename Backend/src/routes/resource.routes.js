const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resource.controller');
const { protect } = require('../middleware/auth.middleware');
const isAdmin = require('../middleware/isAdmin');

router.route('/')
    .get(resourceController.getAllResources)
    .post(protect, isAdmin, resourceController.createResource);

router.route('/:id')
    .put(protect, isAdmin, resourceController.updateResource)
    .delete(protect, isAdmin, resourceController.deleteResource);

module.exports = router;
