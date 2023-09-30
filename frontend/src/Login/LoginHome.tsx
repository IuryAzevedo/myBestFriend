import { FormEvent, useContext, useState } from "react";

import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import HeaderImage from "../assets/MBF.png";
import videoref from "../assets/video/cat.mp4";
import {toast} from 'react-toastify'
import "./LoginHome.css";

export default function LoginHome() {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigate();
  
  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email === "" || password === "") {
      toast.warning("Preencha todos os campos");
      return;
    }

    await signIn({ email: email.toLowerCase(), password })
      .then(() => {
        console.log("Usuario logado");
        navigation("Dashboard");
      })
      .catch((error) => {
        console.log("Erro ao tentar fazer login:", error);
        toast.error("Erro ao fazer login. Verifique suas credenciais.");
      });
  }
  return (
    <form onSubmit={(e) => handleLogin(e)} className="login-section">
      <div>
        <img src={HeaderImage} alt="Header" className="header-image" />
        <video className="catGif" autoPlay loop muted>
          <source src={videoref} type="video/mp4" />
        </video>
      </div>
      <div className="input-box-L">
        <div>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder={"email"}
            className="input-field"
          />
        </div>
        <div>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            className="input-field"
          />
        </div>
      </div>
      <div>
        <button type="submit" className="btLogin">
          <span>Login</span>
        </button>
      </div>
      <div className="aRegister">
        <span>
          Não tem registro?
          <Link className="cadastroStyle" to={"/cadastro"}>
            {" "}
            Registre-se
          </Link>
          !
        </span>
      </div>
    </form>
  );
}
