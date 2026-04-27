import { getAll, getById, createItem, updateItem, deleteItem } from './crud';

/**
 * Fetch all materials
 */
export const fetchMaterials = () => getAll('materials');

/**
 * Fetch a single material by ID
 */
export const fetchMaterialById = (id) => getById('materials', id);

/**
 * Create a new material (semester)
 */
export const createMaterial = (data) => createItem('materials', data);

/**
 * Update an existing material
 */
export const updateMaterial = (id, data) => updateItem('materials', id, data);

/**
 * Delete a material
 */
export const deleteMaterial = (id) => deleteItem('materials', id);
