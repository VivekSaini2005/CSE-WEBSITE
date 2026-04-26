import api from '../api';

/**
 * Public service for fetching student/faculty achievements
 */
export const getAchievements = async () => {
  const response = await api.get('/achievements');
  return response.data;
};

/**
 * Public service for fetching a single achievement by ID
 */
export const getAchievementById = async (id) => {
  const response = await api.get(`/achievements/${id}`);
  return response.data;
};
