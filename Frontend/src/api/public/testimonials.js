import api from '../api';

/**
 * Public service for fetching testimonials
 */
export const getTestimonials = async () => {
  const response = await api.get('/testimonials');
  return response.data;
};

/**
 * Public service for fetching a single testimonial by ID
 */
export const getTestimonialById = async (id) => {
  const response = await api.get(`/testimonials/${id}`);
  return response.data;
};
