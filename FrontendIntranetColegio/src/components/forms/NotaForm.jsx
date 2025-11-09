import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createNota,
  getNotaById,
  updateNota,
} from "../../features/notas/services/nota.api";

const NotaForm = () => {
  const [formData, setFormData] = useState({
    idAlumno: "",
    nota: "",
  });
  const [loading, setLoading] = useState(false);
  const { id } = useParams(); // parámetro de la ruta para editar
  const navigate = useNavigate();

  // Cargar datos si estamos editando, o limpiar si es nuevo
  useEffect(() => {
    const fetchNotaData = async () => {
      if (id) {
        setLoading(true);
        try {
          setFormData({ idAlumno: "", nota: "" }); // limpia mientras carga
          const data = await getNotaById(id);
          setFormData({
            idAlumno: data.idAlumno,
            nota: data.nota,
          });
        } catch (error) {
          console.error("Error al obtener nota:", error);
          alert("Error al cargar la nota.");
        } finally {
          setLoading(false);
        }
      } else {
        // formulario limpio si es nueva nota
        setFormData({ idAlumno: "", nota: "" });
      }
    };

    fetchNotaData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.idAlumno || formData.nota === "") {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      setLoading(true);
      const data = {
        idAlumno: Number(formData.idAlumno),
        nota: Number(formData.nota),
      };

      if (id) {
        await updateNota(id, data);
        alert("Nota actualizada correctamente");
      } else {
        await createNota(data);
        alert("Nota registrada correctamente");
      }

      navigate("/notas");
    } catch (error) {
      console.error("Error guardando nota:", error);
      alert("Error al guardar la nota. Revisa la consola.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>{id ? "Editar Nota" : "Registrar Nota"}</h2>

      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">ID Alumno</label>
          <input
            type="number"
            className="form-control"
            name="idAlumno"
            value={formData.idAlumno}
            onChange={handleChange}
            placeholder="Ejemplo: 3"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Nota</label>
          <input
            type="number"
            className="form-control"
            name="nota"
            value={formData.nota}
            onChange={handleChange}
            min="0"
            max="20"
            step="0.1"
            placeholder="Ejemplo: 17.5"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Guardando..." : id ? "Actualizar" : "Registrar"}
        </button>

        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/notas")}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default NotaForm;
