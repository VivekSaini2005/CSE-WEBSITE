const Material = require('../models/material.model');
const { createOne, getAll, updateOne, deleteOne, getOne } = require('../services/crudFactory');

const getAllMaterials = getAll(Material);
const getMaterial = getOne(Material);
const createMaterial = createOne(Material);
const updateMaterial = updateOne(Material);
const deleteMaterial = deleteOne(Material);

module.exports = {
    getAllMaterials,
    getMaterial,
    createMaterial,
    updateMaterial,
    deleteMaterial,
};
