const Achievement = require('../models/achievementModel');
const { createOne, getAll, updateOne, deleteOne, getOne } = require('../services/crudFactory');

const getAllAchievements = getAll(Achievement);
const getAchievementById = getOne(Achievement);
const createAchievement = createOne(Achievement);
const updateAchievement = updateOne(Achievement);
const deleteAchievement = deleteOne(Achievement);

module.exports = {
    getAllAchievements,
    getAchievementById,
    createAchievement,
    updateAchievement,
    deleteAchievement
};
