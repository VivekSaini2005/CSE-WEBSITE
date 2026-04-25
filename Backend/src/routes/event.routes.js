const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event.controller');
const { protect } = require('../middleware/auth.middleware');
const isAdmin = require('../middleware/isAdmin');

router.route('/')
    .get(eventController.getAllEvents)
    .post(protect, isAdmin, eventController.createEvent);

router.route('/:id')
    .put(protect, isAdmin, eventController.updateEvent)
    .delete(protect, isAdmin, eventController.deleteEvent);

module.exports = router;
