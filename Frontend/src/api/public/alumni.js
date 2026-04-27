import api from "../api";

/**
 * Fetch all alumni for public display
 * @returns {Promise<object>} - The API response data
 */
export const getAlumni = async () => {
  const response = await api.get("/alumni");
  return response.data;
};
