import { getAll, getById, createItem, updateItem, deleteItem } from "./crud";

export const fetchAlumni = () => getAll("alumni");

export const fetchAlumniById = (id) => getById("alumni", id);

export const createAlumni = (data) => createItem("alumni", data);

export const updateAlumni = (id, data) => updateItem("alumni", id, data);

export const deleteAlumni = (id) => deleteItem("alumni", id);
