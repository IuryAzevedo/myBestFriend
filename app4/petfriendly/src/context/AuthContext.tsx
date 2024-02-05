import { useState, createContext, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../services/api";

type AuthContextData = {
    user: UserProps,
    isAuthenticated: boolean,
    singIn: (info: SignInProps) => Promise<void>

}
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

interface SignInResponseProps {
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
            const userInfo = await AsyncStorage.getItem('@myBestfriend');
            const token = await AsyncStorage.getItem('@myBestfriendToken');

            if (userInfo && token) {
                api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                const user = JSON.parse(userInfo);
                setUser(user);
            }
        }

        getUser();
    }, []);


    async function singIn({ email, password }: SignInProps) {
        try {
            const response = await api.post("/session", { email, password });
            const userData: SignInResponseProps = response.data;
            console.log(userData.token, 'login')


            await AsyncStorage.setItem("@myBestfriend", JSON.stringify(userData));
            await AsyncStorage.setItem("@myBestfriendToken", userData.token);


            setUser(userData);
        } catch (error) {
            console.log("Erro ao fazer login:", error);
            throw error;
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, singIn }}>
            {children}
        </AuthContext.Provider>
    );
}