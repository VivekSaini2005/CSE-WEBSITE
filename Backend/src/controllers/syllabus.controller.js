const Syllabus = require('../models/syllabus.model');
const { createOne, getAll, updateOne, deleteOne } = require('../services/crudFactory');

const getAllSyllabus = getAll(Syllabus);
const createSyllabus = createOne(Syllabus);
const updateSyllabus = updateOne(Syllabus);
const deleteSyllabus = deleteOne(Syllabus);

module.exports = {
    getAllSyllabus,
    createSyllabus,
    updateSyllabus,
    deleteSyllabus
};
