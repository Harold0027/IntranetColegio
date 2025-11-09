import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createAlumno, getAlumnoById, updateAlumno } from "../../features/alumnos/services/alumno.api";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const AlumnoForm = () => {
  const { idAlumno } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    edad: "",
    telefono: "",
    activo: true,
  });
  const[loading, setLoading] = useState(false);

  useEffect(()=>{
    if(idAlumno){
        setLoading(true);
        getAlumnoById(idAlumno)
            .then((data)=>{
                setFormData({
                    nombre: data.nombre ?? "",
                    apellido: data.apellido ?? "",
                    edad: data.edad ?? "",
                    telefono: data.telefono ?? "",
                    activo: !!data.activo,
                });
            })
            .catch((err)=> {
                console.error("Error al cargar alumno:", err);
                alert("No se pudo cargar los datos del alumno");
            })
            .finally(() => setLoading(false))
    }
  }, [idAlumno]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev)=>({
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
            activo: !!formData.activo, 
        };

        if(idAlumno) {
            await updateAlumno(idAlumno, payload);
            alert("Alumno actualizado correctamente");
        } else {
            await createAlumno(payload);
            alert("Alumno registrado correctamente");
        }
        navigate("/alumnos");
    } catch(err) {
        console.error("Error guardando alumno: ", err);
        alert("Error al guardar alumno. Revisa la consola");
    }
  };
  if(loading) return <p>Cargando...</p>
    return (
    <div className="p-3">
        <h2>{idAlumno ? "Editar Alumno" : "Registrar Alumno "}</h2>
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
                <Form.Control name="edad" type="number" value={formData.edad} onChange={handleChange} required/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Teléfono</Form.Label>
                <Form.Control name="telefono" value={formData.telefono} onChange={handleChange} />
            </Form.Group>
            <Form.Check name="activo" label="Activo" checked={formData.activo} onChange={handleChange} className="mb-3"/>
            <div className="d-flex gap-3">
                <Button variant="success" type="submit" > {idAlumno ? "Actualizar" : "Registrar"} </Button>
                <Button variant="secondary" onClick={() => navigate("/alumnos")}>Cancelar</Button>
            </div>
        </Form>
    </div>
  );
};

export default AlumnoForm;
