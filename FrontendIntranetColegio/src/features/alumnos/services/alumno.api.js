import api from "../../../services/api";

export const getAlumnos = async () => {
    const {data} = await api.get("/alumno");
    return data; 
};

export const getAlumnoById = async (id) => {
    const { data } = await api.get(`/alumno/${id}`);
    return data;
}; 

export const createAlumno = async (alumno) => {
    const { data } = await api.post("/alumno", alumno);
    return data; 
};

export const updateAlumno = async (id, alumno) => {
    const { data } = await api.put(`/alumno/${id}`, alumno);
    return data;
};

export const deleteAlumno = async (id) => {
    const { data } = await api.delete(`/alumno/${id}`);
    return data;
};
 