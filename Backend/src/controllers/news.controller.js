const News = require('../models/news.model');
const { createOne, getAll, getOne, updateOne, deleteOne } = require('../services/crudFactory');

const getAllNews = getAll(News);
const getNewsById = getOne(News);
const createNews = createOne(News);
const updateNews = updateOne(News);
const deleteNews = deleteOne(News);

module.exports = {
    getAllNews,
    getNewsById,
    createNews,
    updateNews,
    deleteNews
};
