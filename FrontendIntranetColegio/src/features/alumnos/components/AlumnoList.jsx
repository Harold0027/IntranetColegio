import ButtonEdit from "../../../components/UI/ButtonEdit";
import ButtonDelete from "../../../components/UI/ButtonDelete";

const AlumnoList = ({ alumnos, onDelete }) => {
  if (!alumnos || alumnos.length === 0) {
    return <p>No hay alumnos registrados.</p>;
  }

  return (
    <table className="table table-striped table-hover">
      <thead className="table-dark">
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Edad</th>
          <th>Teléfono</th>
          <th>Activo</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {alumnos.map((a) => (
          <tr key={a.idAlumno}>
            <td>{a.idAlumno}</td>
            <td>{a.nombre}</td>
            <td>{a.apellido}</td>
            <td>{a.edad}</td>
            <td>{a.telefono}</td>
            <td>{a.activo ? "Sí" : "No"}</td>
            <td className="d-flex gap-2">
              <ButtonEdit path={`/alumnos/editar/${a.idAlumno}`} />
              <ButtonDelete onClick={() => onDelete(a.idAlumno)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AlumnoList;
