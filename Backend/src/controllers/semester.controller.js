const Semester = require('../models/semester.model');
const { createOne, getAll, updateOne, deleteOne } = require('../services/crudFactory');

const getAllSemesters = getAll(Semester);
const createSemester = createOne(Semester);
const updateSemester = updateOne(Semester);
const deleteSemester = deleteOne(Semester);

module.exports = {
    getAllSemesters,
    createSemester,
    updateSemester,
    deleteSemester
};
