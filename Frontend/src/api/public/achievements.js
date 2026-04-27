import api from "../api";

/**
 * Fetch all achievements for public display
 * @returns {Promise<object>} - The API response data
 */
export const getAchievements = async () => {
  const response = await api.get("/achievements");
  return response.data;
};
