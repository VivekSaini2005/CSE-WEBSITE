import api from '../api';

/**
 * Public service for fetching faculty members
 */
export const getFaculty = async () => {
  const response = await api.get('/faculty');
  return response.data;
};

/**
 * Public service for fetching a single faculty member by ID
 */
export const getFacultyById = async (id) => {
  const response = await api.get(`/faculty/${id}`);
  return response.data;
};
