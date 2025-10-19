// src/features/docentes/components/DocenteList.jsx
import ButtonEdit from "../../../components/UI/ButtonEdit";
import ButtonDelete from "../../../components/UI/ButtonDelete";

const DocenteList = ({ docentes, onDelete }) => {
  if (!docentes || docentes.length === 0) {
    return <p>No hay docentes registrados.</p>;
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
          <th>Salario</th>
          <th>Activo</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {docentes.map((d) => (
          <tr key={d.idDocente}>
            <td>{d.idDocente}</td>
            <td>{d.nombre}</td>
            <td>{d.apellido}</td>
            <td>{d.edad}</td>
            <td>{d.telefono}</td>
            <td>S/ {d.salario}</td>
            <td>{d.activo ? "Sí" : "No"}</td>
            <td className="d-flex gap-2">
              <ButtonEdit path={`/docentes/editar/${d.idDocente}`} />
              <ButtonDelete onClick={() => onDelete(d.idDocente)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DocenteList;
