const Faculty = require('../models/faculty.model');
const { createOne, getAll, updateOne, deleteOne } = require('../services/crudFactory');

const getAllFaculty = getAll(Faculty);
const createFaculty = createOne(Faculty);
const updateFaculty = updateOne(Faculty);
const deleteFaculty = deleteOne(Faculty);

module.exports = {
    getAllFaculty,
    createFaculty,
    updateFaculty,
    deleteFaculty
};
