import HeaderName from "../assets/MBF.png";
import "./Dashboard.css";
import videoref from "../assets/video/Spitz.mp4";

const Dashboard = () => {
  return (
    <section>
      <img className="dashboard-header" src={HeaderName} alt="logo do app" />

      <div className="dashboard-container">
        <div className="gif-box">
            <div className="video-dashboard">
            <video className="spitz" autoPlay loop muted>
              <source src={videoref} type="video/mp4" />
            </video>
            </div>
          <div className="dashboard-button-box">
            
            <button className="dashboard-button">Adicionar Ração</button>
            <button className="dashboard-button">Adicionar Amigo</button>
          </div>
        </div>
        <div className="history-table">
          <p>Historico</p>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
