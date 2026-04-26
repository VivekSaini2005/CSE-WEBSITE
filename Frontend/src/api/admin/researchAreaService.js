import { getAll, getById, createItem, updateItem, deleteItem } from './crud';

const RESOURCE = 'research-areas';

/**
 * Service for managing Research Areas in the admin panel
 */
export const fetchResearchAreas = async () => {
  return await getAll(RESOURCE);
};

export const fetchResearchAreaById = async (id) => {
  return await getById(RESOURCE, id);
};

export const createResearchArea = async (data) => {
  return await createItem(RESOURCE, data);
};

export const updateResearchArea = async (id, data) => {
  return await updateItem(RESOURCE, id, data);
};

export const deleteResearchArea = async (id) => {
  return await deleteItem(RESOURCE, id);
};
