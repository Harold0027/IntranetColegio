// src/components/UI/ButtonRegister.jsx
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const ButtonRegister = ({ onClick, path = "/docentes/nuevo" }) => {
  const navigate = useNavigate();
  const handle = onClick ?? (() => navigate(path));

  return (
    <Button variant="success" onClick={handle} className="mb-3 px-4">
      Registrar
    </Button>
  );
};

export default ButtonRegister;
