// src/features/docentes/services/docente.api.js 
import api from "../../../services/api";

export const getDocentes = async () => {
  const { data } = await api.get("/docente");
  return data; 
};
 
export const getDocenteById = async (id) => {
  const { data } = await api.get(`/docente/${id}`);
  return data;
};

export const createDocente = async (docente) => {
  const { data } = await api.post("/docente", docente);
  return data;
};

export const updateDocente = async (id, docente) => {
  const { data } = await api.put(`/docente/${id}`, docente);
  return data;
};

export const deleteDocente = async (id) => {
  const { data } = await api.delete(`/docente/${id}`);
  return data;
};
