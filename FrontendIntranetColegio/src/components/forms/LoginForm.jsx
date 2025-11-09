import { Container, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext"; 

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); 
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const success = await login(usuario, contraseña);

    if (success) {
      navigate("/dashboard");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-dark">
      <Container className="d-flex justify-content-center">
        <Card
          className="p-4 shadow-lg"
          style={{
            width: "100%",
            maxWidth: "400px",
            backgroundColor: "#4f5052ff",
            color: "white",
            border: "1px solid #353535ff",
          }}
        >
          <h3 className="text-center mb-4">Iniciar Sesión</h3>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formUsuario">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="Ingrese su usuario"
                required
                className="bg-dark text-white border-secondary"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                placeholder="********"
                required
                className="bg-dark text-white border-secondary"
              />
            </Form.Group>

            {error && <p className="text-danger text-center">{error}</p>}

            <div className="d-grid">
              <Button variant="primary" type="submit">
                Ingresar
              </Button>
            </div>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default LoginForm;
