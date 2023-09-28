import { BrowserRouter, Routes, Route } from "react-router-dom";


import LoginHome from "../Login/LoginHome";
import Dashboard from "../Dashboard";
import Cadastro from "../Cadastro/Cadastro";




function RoutesApp() {
    return (
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<LoginHome />} /> {/* 👈 Renders at /app/ */}
          <Route path="/Dashboard" element={<Dashboard/>} />
           <Route path="/Cadastro" element={<Cadastro/>}/> 
        </Routes>
      </BrowserRouter>
    );
  }

  export default RoutesApp;