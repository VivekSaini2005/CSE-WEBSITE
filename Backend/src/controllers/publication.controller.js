const Publication = require('../models/publication.model');
const { createOne, getAll, updateOne, deleteOne } = require('../services/crudFactory');

const getAllPublications = getAll(Publication);
const createPublication = createOne(Publication);
const updatePublication = updateOne(Publication);
const deletePublication = deleteOne(Publication);

module.exports = {
    getAllPublications,
    createPublication,
    updatePublication,
    deletePublication
};
