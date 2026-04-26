import { getAll, getById, createItem, updateItem, deleteItem } from './crud';

const RESOURCE = 'project-guides';

/**
 * Service for managing Project Guides in the admin panel
 */
export const fetchGuides = async () => {
  return await getAll(RESOURCE);
};

export const fetchGuideById = async (id) => {
  return await getById(RESOURCE, id);
};

export const createGuide = async (data) => {
  return await createItem(RESOURCE, data);
};

export const updateGuide = async (id, data) => {
  return await updateItem(RESOURCE, id, data);
};

export const deleteGuide = async (id) => {
  return await deleteItem(RESOURCE, id);
};
