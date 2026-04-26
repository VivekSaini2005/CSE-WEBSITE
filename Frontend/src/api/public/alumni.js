import api from '../api';

/**
 * Public service for fetching alumni details
 */
export const getAlumni = async () => {
  const response = await api.get('/alumni');
  return response.data;
};

/**
 * Public service for fetching a single alumni by ID
 */
export const getAlumniById = async (id) => {
  const response = await api.get(`/alumni/${id}`);
  return response.data;
};
