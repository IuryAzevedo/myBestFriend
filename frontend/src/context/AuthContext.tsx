import { useState, createContext, ReactNode, useEffect } from "react";
import { api } from "../services/api";


type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (info: SignInProps) => Promise<void>;
 // singOut: () => Promise<void>
};
// type RacaoProps = {
//   nome: string;
//   tipo: string;
//   quantidade: number;
//   preco: number;
//   dataRacao: string;
// }

type UserProps = {
  id: string;
  nome: string;
  email: string;
  token: string;
};

type AuthProviderProps = {
  children: ReactNode;
}; 

type SignInProps = {
  email: string;
  password: string;
};

// interface SignInResponseProps{
//     id: string,
//     nome: string,
//     email: string,
//     token: string
// }

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({
    id: "",
    nome: "",
    email: "",
    token: "",
  });

  const isAuthenticated = !!user.nome;

  useEffect(() => {
    async function getUser() {
      const userInfo = await localStorage.getItem('@myBestfriend');
      const token = await localStorage.getItem('@myBestfriendToken');
  
      if (userInfo && token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const user = JSON.parse(userInfo);
        setUser(user);
      }
    }
  
    getUser();
  }, []);
  

  // async function cadastrarRacao(racaoData: RacaoProps) {
  //   try {
  //     const response = await api.post("/addracao", racaoData);
  //     // Manipule a resposta, se necessário
  //     return response.data;
  //   } catch (error) {
  //     // Trate os erros, se necessário
  //     throw error;
  //   }
  // }

  async function signIn({email, password}: SignInProps){
    console.log("signIn");
    
    await api.post("/session", {email, password}).then((response)=>{
      console.log("response",response);
      
      const token = response.data.token
      localStorage.setItem("@myBestfriend", JSON.stringify(token))
      return token

    }).catch((error)=>{
      console.log("error", error);
      return null
      

    })
  }
  

  // async function singOut() {
    
  //   await localStorage.clear().then( () => {
  //     setUser({
  //       id: '',
  //       nome: '',
  //       email: '',
  //       token: ''
  //     })
  //   }

  //   )


  // }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn  }}>
      {children}
    </AuthContext.Provider>
  );
}

