import { Navbar as BsNavbar, Nav, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout(); 
    navigate("/login"); 
  };

  return (
    <BsNavbar bg="light" expand="lg" className="shadow-sm border-bottom">
      <Container fluid>
        <BsNavbar.Brand className="fw-bold">
          {user ? `Bienvenido ${user.usuario} 👋` : "Bienvenido 👋"}
        </BsNavbar.Brand>

        <Nav className="ms-auto">
          <Nav.Link href="#">Perfil</Nav.Link>
          {user && (
            <Nav.Link onClick={handleLogout}>Cerrar sesión</Nav.Link>
          )}
        </Nav>
      </Container>
    </BsNavbar>
  );
};

export default Navbar;
