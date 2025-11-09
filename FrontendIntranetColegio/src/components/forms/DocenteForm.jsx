// src/components/forms/DocenteForm.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createDocente, getDocenteById, updateDocente } from "../../features/docentes/services/docente.api";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
 
const DocenteForm = () => {
  const { idDocente } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    edad: "",
    telefono: "",
    salario: "",
    activo: true,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (idDocente) {
      setLoading(true);
      getDocenteById(idDocente)
        .then((data) => {
          setFormData({
            nombre: data.nombre ?? "",
            apellido: data.apellido ?? "",
            edad: data.edad ?? "",
            telefono: data.telefono ?? "",
            salario: data.salario ?? "",
            activo: !!data.activo,
          });
        })
        .catch((err) => {
          console.error("Error cargando docente:", err);
          alert("No se pudo cargar los datos del docente.");
        })
        .finally(() => setLoading(false));
    }
  }, [idDocente]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        nombre: formData.nombre,
        apellido: formData.apellido,
        edad: Number(formData.edad),
        telefono: formData.telefono,
        salario: Number(formData.salario),
        activo: !!formData.activo,
      };

      if (idDocente) {
        await updateDocente(idDocente, payload);
        alert("Docente actualizado correctamente");
      } else {
        await createDocente(payload);
        alert("Docente registrado correctamente");
      }
      navigate("/docentes");
    } catch (err) {
      console.error("Error guardando docente:", err);
      alert("Error al guardar docente. Revisa la consola.");
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="p-3">
      <h2>{idDocente ? "Editar Docente" : "Registrar Docente"}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control name="nombre" value={formData.nombre} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Apellido</Form.Label>
          <Form.Control name="apellido" value={formData.apellido} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Edad</Form.Label>
          <Form.Control name="edad" type="number" value={formData.edad} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control name="telefono" value={formData.telefono} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Salario</Form.Label>
          <Form.Control name="salario" type="number" step="0.01" value={formData.salario} onChange={handleChange} required />
        </Form.Group>
        <Form.Check name="activo" label="Activo" checked={formData.activo} onChange={handleChange} className="mb-3" />
        <div className="d-flex gap-3">
          <Button variant="success" type="submit">{idDocente ? "Actualizar" : "Registrar"}</Button>
          <Button variant="secondary" onClick={() => navigate("/docentes")}>Cancelar</Button>
        </div>
      </Form>
    </div>
  );
};

export default DocenteForm;
