import { getAll, getById, createItem, updateItem, deleteItem } from './crud';

const RESOURCE = 'syllabus';

/**
 * Service for managing Syllabus in the admin panel
 */
export const fetchSyllabus = async () => {
  return await getAll(RESOURCE);
};

export const fetchSyllabusById = async (id) => {
  return await getById(RESOURCE, id);
};

export const createSyllabus = async (data) => {
  return await createItem(RESOURCE, data);
};

export const updateSyllabus = async (id, data) => {
  return await updateItem(RESOURCE, id, data);
};

export const deleteSyllabus = async (id) => {
  return await deleteItem(RESOURCE, id);
};
