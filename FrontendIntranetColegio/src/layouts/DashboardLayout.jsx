import { Row, Col, Container } from "react-bootstrap";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <Container fluid className="gx-0 px-0">
      <Row className="gx-0 flex-nowrap"> 
        
        <Col
          md={2}
          className="bg-dark text-white vh-100 p-0 position-fixed"
          style={{ width: "16.666667%" }} // 2/12 del ancho
        >
          <Sidebar />
        </Col>

        <Col
          md={{ span: 10, offset: 2 }}
          className="p-0 d-flex flex-column min-vh-100"
        >
          <Navbar />
          
          <main className="flex-grow-1 p-3 bg-light">
            <Outlet />
          </main>
          
          <Footer />
        </Col>

      </Row>
    </Container>
  );
};

export default DashboardLayout;
