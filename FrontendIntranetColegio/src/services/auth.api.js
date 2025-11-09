import api from "./api";

export const login = async (usuario, contraseña) => {
  const { data } = await api.post("/session/login", { usuario, contraseña });
  return data;
};

export const logout = async () => {
  const { data } = await api.post("/session/logout");
  return data;
};
