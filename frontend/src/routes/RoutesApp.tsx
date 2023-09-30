import { BrowserRouter, Routes, Route } from "react-router-dom";


import LoginHome from "../Login/LoginHome";
import Dashboard from "../Dashboard";
import Cadastro from "../Cadastro/Cadastro";
import Racoes from "../Racoes/Racoes";
import Historic from "../Historico/Historico";




function RoutesApp() {
    return (
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<LoginHome />} /> 
          <Route path="/Dashboard" element={<Dashboard/>} />
           <Route path="/Cadastro" element={<Cadastro/>}/> 
           <Route path="/CadastroRacoes" element={<Racoes/>}/>
           <Route path="Historico" element={<Historic/>}/>
        </Routes>
      </BrowserRouter>
    );
  }

  export default RoutesApp;