const News = require('../models/news.model');
const { createOne, getAll, updateOne, deleteOne } = require('../services/crudFactory');

const getAllNews = getAll(News);
const createNews = createOne(News);
const updateNews = updateOne(News);
const deleteNews = deleteOne(News);

module.exports = {
    getAllNews,
    createNews,
    updateNews,
    deleteNews
};
