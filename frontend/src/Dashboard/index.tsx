import HeaderName from "../assets/MBF.png";
import "./Dashboard.css";
import BGimage from "../assets/vectors/bg_final.png";
import videoref from "../assets/video/Spitz.mp4";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigation = useNavigate();

  async function gotoRacao() {
    navigation("/CadastroRacoes");
  }
  async function goToHistoric() {
    navigation('/Historico')
  }
  return (
    <section>
      <div>
        <img className="bg" src={BGimage} alt="background image" />
      </div>

      <img className="dashboard-header" src={HeaderName} alt="logo do app" />

      <div className="dashboard-container">
        <div className="gif-box">
          <div className="video-dashboard">
            <video className="spitz" autoPlay loop muted>
              <source src={videoref} type="video/mp4" />
            </video>
          </div>
          <div className="dashboard-button-box">
            <button className="dashboard-button" onClick={gotoRacao}>
              Adicionar Ração
            </button>
            <button className="dashboard-button">Adicionar Amigo</button>
            <button className="dashboard-button" onClick={goToHistoric}>Histórico de compras</button>
          </div>
        </div>
      </div>
    </section>
  );
}
