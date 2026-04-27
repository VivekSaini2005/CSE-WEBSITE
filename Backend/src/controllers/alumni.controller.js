const Alumni = require('../models/alumni.model');
const { createOne, getAll, getOne, updateOne, deleteOne } = require('../services/crudFactory');

const getAllAlumni = getAll(Alumni);
const getAlumniById = getOne(Alumni);
const createAlumni = createOne(Alumni);
const updateAlumni = updateOne(Alumni);
const deleteAlumni = deleteOne(Alumni);

module.exports = {
    getAllAlumni,
    getAlumniById,
    createAlumni,
    updateAlumni,
    deleteAlumni
};
