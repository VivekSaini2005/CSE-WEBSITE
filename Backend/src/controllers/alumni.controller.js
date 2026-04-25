const Alumni = require('../models/alumni.model');
const { createOne, getAll, updateOne, deleteOne } = require('../services/crudFactory');

const getAllAlumni = getAll(Alumni);
const createAlumni = createOne(Alumni);
const updateAlumni = updateOne(Alumni);
const deleteAlumni = deleteOne(Alumni);

module.exports = {
    getAllAlumni,
    createAlumni,
    updateAlumni,
    deleteAlumni
};
