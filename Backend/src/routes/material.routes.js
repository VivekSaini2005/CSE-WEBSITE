const express = require('express');
const router = express.Router();
const materialController = require('../controllers/material.controller');
const { protect } = require('../middleware/auth.middleware');
const isAdmin = require('../middleware/isAdmin');

router.route('/')
    .get(materialController.getAllMaterials)
    .post(protect, isAdmin, materialController.createMaterial);

router.route('/:id')
    .get(materialController.getMaterial)
    .put(protect, isAdmin, materialController.updateMaterial)
    .delete(protect, isAdmin, materialController.deleteMaterial);

module.exports = router;
