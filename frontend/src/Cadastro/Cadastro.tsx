import { FormEvent, useContext, useState } from "react";
import { api } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import videoref from "../assets/video/dogWalk.mp4";
// import { Navigate } from "react-router-dom";
import './Cadastro.css'


export default function Register() {
  const { signIn } = useContext(AuthContext);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Evita o comportamento padrão do formulário

    if (nome === "" || email === "" || password === "") {
      alert("Você deve preencher todos os campos");
      return;
    }

    try {
      console.log("Tentando registrar...");

      const response = await api.post("/users", { nome, email, password });

      console.log("Resposta do servidor:", response);

      if (response.status === 200) {
        console.log("Registro bem-sucedido");
        signIn({ email, password });
        window.location.href = "/";
      } else {
        console.log("O registro falhou. Tente novamente.");
        alert("O registro falhou. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro durante o registro:", error);
      alert(
        "O registro falhou devido a um erro de rede. Tente novamente mais tarde."
      );
    }
  }

  return (
    <div className="register-container">
      <form onSubmit={(e)=>handleRegister(e)} className="register-section">
      <div>
        <h1 className="title">Registrar</h1>
        <video className="dogWalk" autoPlay loop muted>
          <source src={videoref} type="video/mp4" />
        </video>
      </div>
      <div className="input-box">
        <input
          className="input-field"
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
        className="input-field"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input-field"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="buttonR">
          Registrar
        </button>
      </div>
    </form>
    </div>
  );
}
