const Achievement = require('../models/achievementModel');
const { createOne, getAll, updateOne, deleteOne } = require('../services/crudFactory');

const getAllAchievements = getAll(Achievement);
const createAchievement = createOne(Achievement);
const updateAchievement = updateOne(Achievement);
const deleteAchievement = deleteOne(Achievement);

module.exports = {
    getAllAchievements,
    createAchievement,
    updateAchievement,
    deleteAchievement
};
