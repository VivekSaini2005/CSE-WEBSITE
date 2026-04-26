import api from '../api';

/**
 * Centralized error handler for admin API calls
 */
export const handleApiError = (error) => {
  if (error.response && error.response.data && error.response.data.message) {
    throw new Error(error.response.data.message);
  }
  throw new Error(error.message || 'API request failed');
};

/**
 * Get all items for a specific resource
 * @param {string} resource - e.g., 'news', 'events', 'faculty'
 * @param {object} params - Optional query parameters
 */
export const getAll = async (resource, params = {}) => {
  try {
    const response = await api.get(`/${resource}`, { params });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

/**
 * Get a specific item by ID
 * @param {string} resource - e.g., 'news', 'events'
 * @param {string} id - The item ID
 */
export const getById = async (resource, id) => {
  try {
    const response = await api.get(`/${resource}/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

/**
 * Create a new item
 * @param {string} resource - e.g., 'news', 'events'
 * @param {object} data - The item data
 */
export const createItem = async (resource, data) => {
  try {
    const response = await api.post(`/${resource}`, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

/**
 * Update an existing item
 * @param {string} resource - e.g., 'news', 'events'
 * @param {string} id - The item ID
 * @param {object} data - The updated data
 */
export const updateItem = async (resource, id, data) => {
  try {
    const response = await api.put(`/${resource}/${id}`, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

/**
 * Delete an item
 * @param {string} resource - e.g., 'news', 'events'
 * @param {string} id - The item ID
 */
export const deleteItem = async (resource, id) => {
  try {
    const response = await api.delete(`/${resource}/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
