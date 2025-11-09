// src/components/UI/ButtonDelete.jsx
import Button from "react-bootstrap/Button";

const ButtonDelete = ({ onClick }) => {
  return (
    <Button variant="danger" onClick={onClick} className="px-3">
      Eliminar
    </Button>
  );
};

export default ButtonDelete;
