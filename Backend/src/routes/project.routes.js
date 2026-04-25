const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');

router.route('/')
    .get(projectController.getAllProjects)
    .post(projectController.createProject);

router.route('/:id')
    .put(projectController.updateProject)
    .delete(projectController.deleteProject);

module.exports = router;
