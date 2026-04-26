const Publication = require('../models/publication.model');
const { createOne, getAll, updateOne, deleteOne, getOne } = require('../services/crudFactory');

const getAllPublications = getAll(Publication);
const getPublicationById = getOne(Publication);
const createPublication = createOne(Publication);
const updatePublication = updateOne(Publication);
const deletePublication = deleteOne(Publication);

module.exports = {
    getAllPublications,
    getPublicationById,
    createPublication,
    updatePublication,
    deletePublication
};
