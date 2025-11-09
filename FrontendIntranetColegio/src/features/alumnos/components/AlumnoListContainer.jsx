import { useEffect, useState } from "react";
import { getAlumnos, deleteAlumno } from "../services/alumno.api";
import AlumnoList from "./AlumnoList";
import ButtonRegister from "../../../components/UI/ButtonRegister";
import { useNavigate } from "react-router-dom";

const AlumnoListContainer = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchAlumnos = async () => {
    try {
      const data = await getAlumnos();
      setAlumnos(data);
    } catch (error) {
      console.error("Error al obtener alumnos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlumnos();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este alumno?")) return;
    try {
      await deleteAlumno(id);
      await fetchAlumnos(); // Refresca la lista
    } catch (error) {
      console.error("Error al eliminar alumno:", error);
      alert("No se pudo eliminar el alumno. Revisa la consola.");
    }
  };

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Gestión de Alumnos</h2>
        <ButtonRegister onClick={() => navigate("/alumnos/nuevo")} />
      </div>

      {loading ? (
        <p>Cargando alumnos...</p>
      ) : (
        <AlumnoList alumnos={alumnos} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default AlumnoListContainer;
