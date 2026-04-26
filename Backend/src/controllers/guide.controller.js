const Guide = require('../models/guide.model');
const { createOne, getAll, updateOne, deleteOne, getOne } = require('../services/crudFactory');

const getAllGuides = getAll(Guide);
const getGuideById = getOne(Guide);
const createGuide = createOne(Guide);
const updateGuide = updateOne(Guide);
const deleteGuide = deleteOne(Guide);

module.exports = {
    getAllGuides,
    getGuideById,
    createGuide,
    updateGuide,
    deleteGuide
};
