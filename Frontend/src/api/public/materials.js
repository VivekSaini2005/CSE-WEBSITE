import api from '../api';

/**
 * Public service for fetching materials (consolidated semesters, subjects, and resources)
 */
export const getMaterials = async () => {
    const response = await api.get('/materials');
    return response.data;
};
