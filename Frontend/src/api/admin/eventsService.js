import { getAll, getById, createItem, updateItem, deleteItem } from './crud';

const RESOURCE = 'events';

/**
 * Service for managing Events in the admin panel
 */
export const fetchEvents = async () => {
  return await getAll(RESOURCE);
};

export const fetchEventById = async (id) => {
  return await getById(RESOURCE, id);
};

export const createEvent = async (data) => {
  // We can add data validation or transformation here later
  return await createItem(RESOURCE, data);
};

export const updateEvent = async (id, data) => {
  // We can add data validation or transformation here later
  return await updateItem(RESOURCE, id, data);
};

export const deleteEvent = async (id) => {
  return await deleteItem(RESOURCE, id);
};
