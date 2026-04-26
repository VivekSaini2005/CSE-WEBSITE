import { getAll, getById, createItem, updateItem, deleteItem } from './crud';

const RESOURCE = 'faculty';

/**
 * Fetch all faculty members
 */
export const fetchFaculty = async () => {
  return await getAll(RESOURCE);
};

/**
 * Fetch a single faculty member by ID
 */
export const fetchFacultyById = async (id) => {
  return await getById(RESOURCE, id);
};

/**
 * Create a new faculty member
 */
export const createFaculty = async (data) => {
  return await createItem(RESOURCE, data);
};

/**
 * Update an existing faculty member
 */
export const updateFaculty = async (id, data) => {
  return await updateItem(RESOURCE, id, data);
};

/**
 * Delete a faculty member
 */
export const deleteFaculty = async (id) => {
  return await deleteItem(RESOURCE, id);
};
