import api from '../api';

/**
 * Public service for fetching project guides
 */
export const getGuides = async () => {
  const response = await api.get('/project-guides');
  return response.data;
};

/**
 * Public service for fetching a single guide by ID
 */
export const getGuideById = async (id) => {
  const response = await api.get(`/project-guides/${id}`);
  return response.data;
};
