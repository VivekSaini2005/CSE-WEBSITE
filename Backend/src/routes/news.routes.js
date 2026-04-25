const express = require('express');
const router = express.Router();
const newsController = require('../controllers/news.controller');
const { protect } = require('../middleware/auth.middleware');
const isAdmin = require('../middleware/isAdmin');

router.route('/')
    .get(newsController.getAllNews)
    .post(protect, isAdmin, newsController.createNews);

router.route('/:id')
    .put(protect, isAdmin, newsController.updateNews)
    .delete(protect, isAdmin, newsController.deleteNews);

module.exports = router;
