import api from '../api';

/**
 * Public service for fetching news articles
 */
export const getNews = async () => {
  const response = await api.get('/news');
  return response.data;
};

/**
 * Public service for fetching a single news article by ID
 */
export const getNewsById = async (id) => {
  const response = await api.get(`/news/${id}`);
  return response.data;
};
