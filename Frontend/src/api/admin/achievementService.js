import { getAll, getById, createItem, updateItem, deleteItem } from "./crud";

export const fetchAchievements = () => getAll("achievements");

export const fetchAchievementById = (id) => getById("achievements", id);

export const createAchievement = (data) => createItem("achievements", data);

export const updateAchievement = (id, data) => updateItem("achievements", id, data);

export const deleteAchievement = (id) => deleteItem("achievements", id);
