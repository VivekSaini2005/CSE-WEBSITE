const Syllabus = require('../models/syllabus.model');
const { createOne, getAll, getOne, updateOne, deleteOne } = require('../services/crudFactory');

const getAllSyllabus = getAll(Syllabus);
const getSyllabusById = getOne(Syllabus);
const createSyllabus = createOne(Syllabus);
const updateSyllabus = updateOne(Syllabus);
const deleteSyllabus = deleteOne(Syllabus);

module.exports = {
    getAllSyllabus,
    getSyllabusById,
    createSyllabus,
    updateSyllabus,
    deleteSyllabus
};
