import { getAll, createItem, updateItem, deleteItem } from './crud';

const RESOURCE = 'subject';

/**
 * Fetch all subjects
 * Endpoint: GET /subject
 */
export const fetchSubjects = async () => {
  return await getAll(RESOURCE);
};

/**
 * Fetch subjects filtered by semester
 * Endpoint: GET /subject?semester=semesterId
 * @param {string} semesterId - The semester ObjectId
 */
export const fetchSubjectsBySemester = async (semesterId) => {
  return await getAll(RESOURCE, { semester: semesterId });
};

/**
 * Create a new subject
 * Endpoint: POST /subject
 * Data format: { name, semester (ObjectId) }
 * @param {object} data - Subject data
 */
export const createSubject = async (data) => {
  return await createItem(RESOURCE, data);
};

/**
 * Update an existing subject
 * Endpoint: PUT /subject/:id
 * @param {string} id - Subject ID
 * @param {object} data - Updated data
 */
export const updateSubject = async (id, data) => {
  return await updateItem(RESOURCE, id, data);
};

/**
 * Delete a subject
 * Endpoint: DELETE /subject/:id
 * @param {string} id - Subject ID
 */
export const deleteSubject = async (id) => {
  return await deleteItem(RESOURCE, id);
};
