import api from '../api';

/**
 * Public service for fetching semesters
 */
export const getSemesters = async () => {
  const response = await api.get('/semester');
  return response.data;
};

/**
 * Public service for fetching subjects
 */
export const getSubjects = async () => {
  const response = await api.get('/subject');
  return response.data;
};

/**
 * Public service for fetching study resources
 */
export const getResources = async () => {
  const response = await api.get('/resource');
  return response.data;
};
