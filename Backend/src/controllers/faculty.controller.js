const Faculty = require('../models/faculty.model');
const { createOne, getAll, updateOne, deleteOne, getOne } = require('../services/crudFactory');

const getAllFaculty = getAll(Faculty);
const getFacultyById = getOne(Faculty);
const createFaculty = createOne(Faculty);
const updateFaculty = updateOne(Faculty);
const deleteFaculty = deleteOne(Faculty);

module.exports = {
    getAllFaculty,
    getFacultyById,
    createFaculty,
    updateFaculty,
    deleteFaculty
};
