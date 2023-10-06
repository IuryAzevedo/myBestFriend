import { useEffect, useState, useContext } from "react";
import { api } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import BGimage from "../assets/vectors/bg_final.png";
import deleteIMG from "../assets/vectors/excluir.png";
import videoref from "../assets/video/money-video.mp4";
import "../Historico/Historico.css";

type Racao = {
  id: string;
  nome: string;
  tipo: string;
  dataRacao: Date;
  preco: number;
  quantidade: number;
};

export default function Historic() {
  const { user } = useContext(AuthContext);
  const [racoes, setRacoes] = useState<Array<Racao>>([]);
  const [monthlySum, setMonthlySum] = useState<{ [monthYear: string]: number }>(
    {}
  );

  useEffect(() => {
    async function fetchRacoes() {
      try {
        const token = await localStorage.getItem("@myBestfriendToken");
        const response = await api.post(
          `/racoes`,
          { user_id: user.id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRacoes(response.data);
      } catch (error) {
        console.error("Erro ao fazer a solicitação:", error);
      }
    }

    fetchRacoes();
  }, [user.id]);

  useEffect(() => {
    const monthlySumMap: { [key: string]: number } = {};

    racoes.forEach((item) => {
      const date = new Date(item.dataRacao);
      const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;

      const totalPrice = item.preco;

      if (!monthlySumMap[monthYear]) {
        monthlySumMap[monthYear] = totalPrice;
      } else {
        monthlySumMap[monthYear] += totalPrice;
      }
    });

    setMonthlySum(monthlySumMap);
  }, [racoes]);

  async function deleteItem(id: string) {
    try {
      const token = await localStorage.getItem("@myBestfriendToken");
      await api.delete(`/racoes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRacoes((prevRacoes) => prevRacoes.filter((racao) => racao.id !== id));
    } catch (error) {
      console.error("Erro ao excluir o item:", error);
    }
  }

  function formatDate(date: Date) {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
  
    return `${day}/${month}/${year}`;
  }

  return (
    <div className="container-H">
      <div>
        <img className="bg" src={BGimage} alt="background image" />
      </div>
      <h1 className="HC-TEXT">Histórico de Compras</h1>
      <div className="video-Historico">
        <video className="money-video" autoPlay loop muted>
          <source src={videoref} type="video/mp4" />
        </video>
      </div>
      <div className="content-container">
        <div className="table-container">
          <div className="div-table">
            <table className="table">
              <thead>
                <tr>
                  <th className="table-header">Nome</th>
                  <th className="table-header">Tipo</th>
                  <th className="table-header">Quantidade (Kg)</th>
                  <th className="table-header">Preço (R$)</th>
                  <th className="table-header">Data de Compra</th>
                </tr>
              </thead>
              <tbody>
                {racoes.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nome}</td>
                    <td>{item.tipo}</td>
                    <td>{item.quantidade.toFixed(2)} kg</td>
                    <td style={{ color: "green" }}>
                      R$ {item.preco.toFixed(2)}
                    </td>
                    <td>
                      {formatDate(new Date(item.dataRacao))}
                      <button
                        className="bt-delete"
                        onClick={() => deleteItem(item.id)}
                      >
                        <img
                          className="delete-bt"
                          src={deleteIMG}
                          alt="delete-button"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="total-gasto-container">
          {Object.keys(monthlySum).map((monthYear) => (
            <div className="TOTAL-GASTO" key={monthYear}>
              <h2 className="TEXT-GASTO">Total gasto em {monthYear}:</h2>
              <p className="money-text">
                R$ {monthlySum[monthYear].toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
