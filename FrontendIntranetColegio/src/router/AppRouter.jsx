import { Route,Routes,BrowserRouter,Navigate } from 'react-router-dom';
import Dashboard from "../pages/Dashboard";
import DashboardLayout from '../layouts/DashboardLayout';
import Login from "../pages/Login";
import Docentes from "../features/docentes/pages/DocentePage";
import DocenteForm from "../components/forms/DocenteForm"; 
import Alumnos from "../features/alumnos/pages/AlumnoPage";
import Notas from "../features/notas/pages/NotaPage";
import Pagos from "../features/pagos/pages/PagoPage";
import Reportes from "../features/reportes/Pages/ReportesPage";
const AppRouter = () => {
  return (
      <BrowserRouter>
            <Routes>
              <Route path='/login' element={<Login/>} ></Route>
              <Route element={ <DashboardLayout/> }>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path='/dashboard' element={<Dashboard/>} />
                <Route path='/docentes' element={<Docentes/>} />
                <Route path="docentes/nuevo" element={<DocenteForm />} />
                <Route path="docentes/editar/:idDocente" element={<DocenteForm />} />
                <Route path='/alumnos' element={<Alumnos/>} />
                <Route path='/notas' element={<Notas/>} />
                <Route path='/pagos' element={<Pagos/>} />
                <Route path='/reportes' element={<Reportes/>} />
              </Route>
            </Routes>
      </BrowserRouter>
  )
}

export default AppRouter
