const ResearchArea = require('../models/researchArea.model');
const { createOne, getAll, updateOne, deleteOne } = require('../services/crudFactory');

const getAllResearchAreas = getAll(ResearchArea);
const createResearchArea = createOne(ResearchArea);
const updateResearchArea = updateOne(ResearchArea);
const deleteResearchArea = deleteOne(ResearchArea);

module.exports = {
    getAllResearchAreas,
    createResearchArea,
    updateResearchArea,
    deleteResearchArea
};
