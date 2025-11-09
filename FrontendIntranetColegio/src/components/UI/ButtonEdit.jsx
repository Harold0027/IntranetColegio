// src/components/UI/ButtonEdit.jsx
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const ButtonEdit = ({ path, onClick }) => {
  const navigate = useNavigate();
  const handle = onClick ?? (() => navigate(path));

  return (
    <Button variant="warning" onClick={handle} className="px-3 text-dark">
      Editar
    </Button>
  );
};

export default ButtonEdit;
