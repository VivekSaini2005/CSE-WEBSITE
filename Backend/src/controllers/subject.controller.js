const Subject = require('../models/subject.model');
const { createOne, getAll, updateOne, deleteOne } = require('../services/crudFactory');

const getAllSubjects = getAll(Subject, 'semester');
const createSubject = createOne(Subject);
const updateSubject = updateOne(Subject);
const deleteSubject = deleteOne(Subject);

module.exports = {
    getAllSubjects,
    createSubject,
    updateSubject,
    deleteSubject
};
