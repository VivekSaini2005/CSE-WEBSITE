const Guide = require('../models/guide.model');
const { createOne, getAll, updateOne, deleteOne } = require('../services/crudFactory');

const getAllGuides = getAll(Guide);
const createGuide = createOne(Guide);
const updateGuide = updateOne(Guide);
const deleteGuide = deleteOne(Guide);

module.exports = {
    getAllGuides,
    createGuide,
    updateGuide,
    deleteGuide
};
