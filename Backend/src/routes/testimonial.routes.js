const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonial.controller');
const { protect } = require('../middleware/auth.middleware');
const isAdmin = require('../middleware/isAdmin');

router.route('/')
    .get(testimonialController.getAllTestimonials)
    .post(protect, isAdmin, testimonialController.createTestimonial);

router.route('/:id')
    .put(protect, isAdmin, testimonialController.updateTestimonial)
    .delete(protect, isAdmin, testimonialController.deleteTestimonial);

module.exports = router;
