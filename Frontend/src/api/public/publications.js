import api from '../api';

/**
 * Public service for fetching publications
 */
export const getPublications = async () => {
  const response = await api.get('/publications');
  return response.data;
};

/**
 * Public service for fetching a single publication by ID
 */
export const getPublicationById = async (id) => {
  const response = await api.get(`/publications/${id}`);
  return response.data;
};
