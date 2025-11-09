import { useEffect, useState } from "react";
import { getNotas, deleteNota } from "../services/nota.api";
import NotaList from "./NotaList";
import ButtonRegister from "../../../components/UI/ButtonRegister";
import { useNavigate } from "react-router-dom";

const NotaListContainer = () => {
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchNotas = async () => {
    try {
      const data = await getNotas();
      setNotas(data);
    } catch (error) {
      console.error("Error al obtener notas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotas();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar esta nota?")) return;
    try {
      await deleteNota(id);
      await fetchNotas();
    } catch (error) {
      console.error("Error al eliminar nota:", error);
      alert("No se pudo eliminar. Revisa permisos o conexión.");
    }
  };

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Gestión de Notas</h2>
        <ButtonRegister onClick={() => navigate("/notas/nuevo")} />
      </div>

      {loading ? (
        <p>Cargando notas...</p>
      ) : (
        <NotaList notas={notas} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default NotaListContainer;
