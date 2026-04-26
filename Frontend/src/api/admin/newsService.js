import { getAll, getById, createItem, updateItem, deleteItem } from './crud';

const RESOURCE = 'news';

/**
 * Service for managing News in the admin panel
 */
export const fetchNews = async () => {
  return await getAll(RESOURCE);
};

export const fetchNewsById = async (id) => {
  return await getById(RESOURCE, id);
};

export const createNews = async (data) => {
  return await createItem(RESOURCE, data);
};

export const updateNews = async (id, data) => {
  return await updateItem(RESOURCE, id, data);
};

export const deleteNews = async (id) => {
  return await deleteItem(RESOURCE, id);
};
