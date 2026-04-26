import api from '../api';

/**
 * Public service for fetching syllabus data
 */
export const getSyllabus = async () => {
  const response = await api.get('/syllabus');
  return response.data;
};

/**
 * Public service for fetching a single syllabus entry by ID
 */
export const getSyllabusById = async (id) => {
  const response = await api.get(`/syllabus/${id}`);
  return response.data;
};
