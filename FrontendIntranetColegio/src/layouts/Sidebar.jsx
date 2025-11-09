import { useState } from "react";
import { Nav, Button } from "react-bootstrap";
import { House, People, Book, FileText, Cash, Clipboard, List } from "react-bootstrap-icons"; 
const Sidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={`bg-dark text-white p-3 d-flex flex-column position-fixed top-0 start-0 h-100 transition-all ${
        open ? "sidebar-open" : "sidebar-collapsed"
      }`}
      style={{
        width: open ? "220px" : "70px",
        transition: "width 0.3s ease",
        zIndex: 1000,
      }}
    >
      <div className="d-flex align-items-center justify-content-between mb-4">
        {open && <h5 className="m-0">Colegio</h5>}
        {/* <Button
          variant="outline-light"
          size="sm"
          onClick={() => setOpen(!open)}
          className="border-0"
        >
          <List size={20} />
        </Button> */}
      </div>

      <Nav className="flex-column">
        <Nav.Link href="/dashboard" className="text-white d-flex align-items-center mb-2">
          <House className="me-2" /> {open && "Dashboard"}
        </Nav.Link>
        <Nav.Link href="/docentes" className="text-white d-flex align-items-center mb-2">
          <People className="me-2" /> {open && "Docentes"}
        </Nav.Link>
        <Nav.Link href="/alumnos" className="text-white d-flex align-items-center mb-2">
          <People className="me-2" /> {open && "Alumnos"}
        </Nav.Link>
        <Nav.Link href="/notas" className="text-white d-flex align-items-center mb-2">
          <Clipboard className="me-2" /> {open && "Notas"}
        </Nav.Link>
        <Nav.Link href="/pagos" className="text-white d-flex align-items-center mb-2">
          <Cash className="me-2" /> {open && "Pagos"}
        </Nav.Link>
        <Nav.Link href="/reportes" className="text-white d-flex align-items-center mb-2">
          <FileText className="me-2" /> {open && "Reportes"}
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
