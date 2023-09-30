import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../services/api";
import videoref from "../assets/video/hungryCat.mp4";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import '../Racoes/Racoes.css'
import BGimage from '../assets/vectors/bg_final.png'

export default function Racoes() {

  const [nome, setNome] = useState<string>("");
  const [tipo, setTipo] = useState<string>("");
  const [quantidade, setQuantidade] = useState<string>();
  const [preco, setPreco] = useState<string>();
  const [dataRacao, setDataRacao] = useState<Date>(new Date());

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const token = await localStorage.getItem("@myBestfriendToken");
    cadastroRacao(token);

    async function cadastroRacao(token: string | null) {
      console.log("token", token);

      try {
        const requestBody = {
          nome,
          tipo,
          quantidade: Number(quantidade),
          preco: Number(preco),
          dataRacao: dataRacao,
        };

        await api
          .post("/addracao", requestBody, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => toast.success("Ração cadastrada com sucesso!"))
          .catch((error) => console.log(error));
      } catch (error) {
        console.error("Erro ao cadastrar a ração:", error);
      }
    }
  };
  const handleDateChange = (e: { target: { value: string | number | Date; }; }) => {
    const selectedDate = new Date(e.target.value);
    setDataRacao(selectedDate);
  };

  return (

    
    <div className="r-container">
       <div>
        <img className="bg" src={BGimage} alt="background image" />
      </div>
      <form onSubmit={(e) => handleSubmit(e)}  className="r-form">

       <div>
       <p className="nameScreenR">Cadastro de Rações</p>
        <video className="hungryCat" autoPlay loop muted>
          <source src={videoref} type="video/mp4" />
        </video>
       </div>


        <div className="input-box-racoes">
        <input
        type="name"
        maxLength={20}
          className="input-racoes"
          placeholder="Nome da Ração"
          onChange={(e) => setNome(e.target.value)}
          value={nome}
        />
        <input
        maxLength={20}
          className="input-racoes"
          placeholder="Tipo da Ração"
          onChange={(e) => setTipo(e.target.value)}
          value={tipo}
        />
        <input
          maxLength={2}
          className="input-racoes"
          placeholder="Quantidade"
          onChange={(e) => setQuantidade(e.target.value)}
          value={quantidade}
          type="number"
        />
        <input
            maxLength={6}
          className="input-racoes"
          placeholder="Preço"
          onChange={(e) => setPreco(e.target.value)}
          value={preco}
          type="number"
        />
        <input
          className="date"
          type="date"
          placeholder="Data da Ração"
          value={format(dataRacao, "yyyy-MM-dd")} 
          onChange={handleDateChange}
        />
         <p>Data selecionada: {format(dataRacao, "dd/MM/yyyy")}</p>

        <button type="submit" className="btAdd">
          <span className="btTextR">Adicionar Ração</span>
        </button>
        </div>
      </form>
    </div>
  );
}
