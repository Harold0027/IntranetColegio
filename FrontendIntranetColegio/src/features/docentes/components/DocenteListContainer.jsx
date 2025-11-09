// src/features/docentes/components/DocenteListContainer.jsx
import { useEffect, useState } from "react";
import {
  getDocentes,
  deleteDocente,
} from "../services/docente.api";
import DocenteList from "./DocenteList";
import ButtonRegister from "../../../components/UI/ButtonRegister";
import { useNavigate } from "react-router-dom";

const DocenteListContainer = () => {
  const [docentes, setDocentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchDocentes = async () => {
    try {
      const data = await getDocentes();
      setDocentes(data);
    } catch (error) {
      console.error("Error al obtener docentes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocentes();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este docente?")) return;
    try {
      await deleteDocente(id); // llama a API
      await fetchDocentes();   // refresca lista
    } catch (error) {
      console.error("Error al eliminar docente:", error);
      alert("No se pudo eliminar. Revisa la consola y permisos.");
    }
  };
  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Gestión de Docentes</h2>
        <ButtonRegister onClick={() => navigate("/docentes/nuevo")} />
      </div>

      {loading ? (
        <p>Cargando docentes...</p>
      ) : (
        <DocenteList docentes={docentes} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default DocenteListContainer;
