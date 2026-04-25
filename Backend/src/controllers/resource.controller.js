const Resource = require('../models/resource.model');
const { createOne, getAll, updateOne, deleteOne } = require('../services/crudFactory');

const getAllResources = getAll(Resource);
const createResource = createOne(Resource);
const updateResource = updateOne(Resource);
const deleteResource = deleteOne(Resource);

module.exports = {
    getAllResources,
    createResource,
    updateResource,
    deleteResource
};
