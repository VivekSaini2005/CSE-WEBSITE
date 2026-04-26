import { getAll, getById, createItem, updateItem, deleteItem } from './crud';

const RESOURCE = 'publications';

/**
 * Service for managing Publications in the admin panel
 */
export const fetchPublications = async () => {
  return await getAll(RESOURCE);
};

export const fetchPublicationById = async (id) => {
  return await getById(RESOURCE, id);
};

export const createPublication = async (data) => {
  return await createItem(RESOURCE, data);
};

export const updatePublication = async (id, data) => {
  return await updateItem(RESOURCE, id, data);
};

export const deletePublication = async (id) => {
  return await deleteItem(RESOURCE, id);
};
