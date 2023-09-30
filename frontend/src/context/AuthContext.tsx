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

interface SignInResponseProps{
    id: string,
    nome: string,
    email: string,
    token: string
}

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
  


  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post("/session", { email, password });
      const userData: SignInResponseProps = response.data;
      console.log(userData.token, 'login')
      

      await localStorage.setItem("@myBestfriend", JSON.stringify(userData));
      await localStorage.setItem("@myBestfriendToken", userData.token);
      
      
      setUser(userData);
    } catch (error) {
      console.log("Erro ao fazer login:", error);
      throw error;
    }
  }
  
  

  // async function signOut() {
  //   try {
  //     await localStorage.clear();
  //     setUser({
  //       id: "",
  //       nome: "",
  //       email: "",
  //       token: "",
  //     });
      
  //     navigation.navigate('SignIn'); 
  //   } catch (error) {
  //     console.error("Erro durante o logout:", error);
  //     throw error;
  //   }
  // }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn  }}>
      {children}
    </AuthContext.Provider>
  );
}

