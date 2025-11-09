import api from "../../../services/api";

// Obtener todas las notas
export const getNotas = async () => {
  const { data } = await api.get("/nota");
  return data;
};

// Obtener nota por ID
export const getNotaById = async (id) => {
  const { data } = await api.get(`/nota/${id}`);
  return data;
};

// Crear una nueva nota
export const createNota = async (nota) => {
  const { data } = await api.post("/nota", nota);
  return data;
};

// Actualizar una nota
export const updateNota = async (id, nota) => {
  const { data } = await api.put(`/nota/${id}`, nota);
  return data;
};

// Eliminar una nota
export const deleteNota = async (id) => {
  const { data } = await api.delete(`/nota/${id}`);
  return data;
};
