import api from '../api';

/**
 * Public service for fetching events
 */
export const getEvents = async () => {
  const response = await api.get('/events');
  return response.data;
};

/**
 * Public service for fetching a single event by ID
 */
export const getEventById = async (id) => {
  const response = await api.get(`/events/${id}`);
  return response.data;
};
