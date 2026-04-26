import api from '../api';

/**
 * Public service for fetching research areas
 */
export const getResearchAreas = async () => {
  const response = await api.get('/research-areas');
  return response.data;
};

/**
 * Public service for fetching a single research area by ID
 */
export const getResearchAreaById = async (id) => {
  const response = await api.get(`/research-areas/${id}`);
  return response.data;
};
