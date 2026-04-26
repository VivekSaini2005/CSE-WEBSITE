const ResearchArea = require('../models/researchArea.model');
const { createOne, getAll, updateOne, deleteOne, getOne } = require('../services/crudFactory');

const getAllResearchAreas = getAll(ResearchArea);
const getResearchAreaById = getOne(ResearchArea);
const createResearchArea = createOne(ResearchArea);
const updateResearchArea = updateOne(ResearchArea);
const deleteResearchArea = deleteOne(ResearchArea);

module.exports = {
    getAllResearchAreas,
    getResearchAreaById,
    createResearchArea,
    updateResearchArea,
    deleteResearchArea
};
