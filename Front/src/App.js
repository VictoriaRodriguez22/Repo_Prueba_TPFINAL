import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './BarraPrincipal/navbar';
import RegistrationForm from './Registro';
import Alumno from './Alumno/alumno';
import Footer from './Footer/footer';
import Asistencia from './Asistencia/asistencia';
import Notas from './Notas/notas';
import Boletin from './Boletin/boletin';
import Materias from './Materias/materias';
import Avisos from './Avisos/avisos';
import Mensaje from './Mensaje/mensaje';
import InicioSesion from './InicioSesion/inicioSesion';
import Sidebar from './MenuLateral/sideMenu';
import Home from './Home/home';
import PlanDeEstudios from './MenuLateral/PlanDeEstudio/planDeEstudio';
import Beneficios from './MenuLateral/Beneficios/beneficios';
import Inscripcion from './MenuLateral/InscripcionOnline/inscripcion'
import Talleres from './MenuLateral/Talleres/talleres';
import Directivos from './MenuLateral/Directivos/directivos'


const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          
          </div>
          <div className="col-md-9">
            {/* Contenido principal */}
            <Routes>
              <Route path="/iniciarSesion" element={<InicioSesion />} />
              <Route path="/" element={<Home />} />
              <Route path="/notas" element={<Notas />} />
              <Route path="/boletin" element={<Boletin />} />
              <Route path="/materias" element={<Materias />} />
              <Route path="/Asistencia" element={<Asistencia />} />
              <Route path="/avisos" element={<Avisos />} />
              <Route path="/mensaje" element={<Mensaje />} />
              <Route path="/plan-de-estudio" element={<PlanDeEstudios />} />
              <Route path="/beneficios" element={<Beneficios />} />
              <Route path="/inscripcion-online" element={<Inscripcion />} />
              <Route path="/directivos" element={<Directivos />} />
              <Route path="/talleres" element={<Talleres />} />
  

            </Routes>
          </div>
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
