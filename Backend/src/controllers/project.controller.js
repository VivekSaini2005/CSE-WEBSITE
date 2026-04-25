const Project = require('../models/project.model');
const { createOne, getAll, updateOne, deleteOne } = require('../services/crudFactory');

const getAllProjects = getAll(Project);
const createProject = createOne(Project);
const updateProject = updateOne(Project);
const deleteProject = deleteOne(Project);

module.exports = {
    getAllProjects,
    createProject,
    updateProject,
    deleteProject
};
