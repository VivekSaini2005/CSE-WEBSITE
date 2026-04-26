import { getAll, getById, createItem, updateItem, deleteItem } from './crud';

const RESOURCE = 'testimonials';

/**
 * Service for managing Testimonials in the admin panel
 */
export const fetchTestimonials = async () => {
  return await getAll(RESOURCE);
};

export const fetchTestimonialById = async (id) => {
  return await getById(RESOURCE, id);
};

export const createTestimonial = async (data) => {
  return await createItem(RESOURCE, data);
};

export const updateTestimonial = async (id, data) => {
  return await updateItem(RESOURCE, id, data);
};

export const deleteTestimonial = async (id) => {
  return await deleteItem(RESOURCE, id);
};
