import ButtonEdit from "../../../components/UI/ButtonEdit";
import ButtonDelete from "../../../components/UI/ButtonDelete";

const NotaList = ({ notas, onDelete }) => {
  if (!notas || notas.length === 0) {
    return <p>No hay notas registradas.</p>;
  }

  return (
    <table className="table table-striped table-hover">
      <thead className="table-dark">
        <tr>
          <th>ID Nota</th>
          <th>ID Alumno</th>
          <th>Nota</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {notas.map((n) => (
          <tr key={n.idNota}>
            <td>{n.idNota}</td>
            <td>{n.idAlumno}</td>
            <td>{n.nota}</td>
            <td className="d-flex gap-2">
              <ButtonEdit path={`/notas/editar/${n.idNota}`} />
              <ButtonDelete onClick={() => onDelete(n.idNota)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default NotaList;
