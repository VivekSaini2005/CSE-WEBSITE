import { getAll, createItem, updateItem, deleteItem } from './crud';

const RESOURCE = 'resource';

/**
 * Fetch all resources
 * Endpoint: GET /resource
 */
export const fetchResources = async () => {
  return await getAll(RESOURCE);
};

/**
 * Fetch resources filtered by subject
 * Endpoint: GET /resource?subject=subjectId
 * @param {string} subjectId - The subject ObjectId
 */
export const fetchResourcesBySubject = async (subjectId) => {
  return await getAll(RESOURCE, { subject: subjectId });
};

/**
 * Create a new resource
 * Endpoint: POST /resource
 * Data format: { title, link, subject (ObjectId) }
 * @param {object} data - Resource data
 */
export const createResource = async (data) => {
  return await createItem(RESOURCE, data);
};

/**
 * Update an existing resource
 * Endpoint: PUT /resource/:id
 * @param {string} id - Resource ID
 * @param {object} data - Updated data
 */
export const updateResource = async (id, data) => {
  return await updateItem(RESOURCE, id, data);
};

/**
 * Delete a resource
 * Endpoint: DELETE /resource/:id
 * @param {string} id - Resource ID
 */
export const deleteResource = async (id) => {
  return await deleteItem(RESOURCE, id);
};
