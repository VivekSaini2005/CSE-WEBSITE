import { getAll, createItem, updateItem, deleteItem } from './crud';

const RESOURCE = 'semester';

/**
 * Fetch all semesters
 * Endpoint: GET /semester
 */
export const fetchSemesters = async () => {
  return await getAll(RESOURCE);
};

/**
 * Create a new semester
 * Endpoint: POST /semester
 * @param {object} data - Semester data
 */
export const createSemester = async (data) => {
  return await createItem(RESOURCE, data);
};

/**
 * Update an existing semester
 * Endpoint: PUT /semester/:id
 * @param {string} id - Semester ID
 * @param {object} data - Updated data
 */
export const updateSemester = async (id, data) => {
  return await updateItem(RESOURCE, id, data);
};

/**
 * Delete a semester
 * Endpoint: DELETE /semester/:id
 * @param {string} id - Semester ID
 */
export const deleteSemester = async (id) => {
  return await deleteItem(RESOURCE, id);
};
