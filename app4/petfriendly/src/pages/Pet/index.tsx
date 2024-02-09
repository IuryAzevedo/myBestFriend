import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Keyboard, TouchableOpacity, TouchableWithoutFeedback, Image } from "react-native";
import { TextInput, } from "react-native-gesture-handler";
import LottieView from "lottie-react-native";
import { api } from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "toastify-react-native";
import { AuthContext } from "../../context/AuthContext";

export default function Pet() {
    const { user } = useContext(AuthContext)
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState<number | undefined>(undefined);
    const [tipo, setTipo] = useState('');
    const [raca, setRaca] = useState('');
    const [cadastroSucesso, setCadastroSucesso] = useState(false);

    const handleSubmit = async () => {
        if(!user) {
            console.log('Usuário não autenticado');
            return
        }

        const token = await AsyncStorage.getItem('@myBestFriendToken');
        cadastroPet(token);
    }

    async function cadastroPet(token: string | null) {
        try {
            const requestBody = {
                nome,
                idade,
                tipo,
                raca,
                // owner_id: user.id
            };
            await api.post('/addpets', requestBody, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            Toast.success('Pet cadastrado', 'top');
            setCadastroSucesso(true);
        } catch (error) {
            console.log('Erro ao cadastrar pet', error);
            Toast.error('Erro ao cadastrar', 'top');
        }
    }

    const dismissKeyboard = () => {
        Keyboard.dismiss()
    }

    const handleIdadeChange = (idadeString: string) => {
        const idadeNumber = parseInt(idadeString);
        setIdade(isNaN(idadeNumber) ? undefined : idadeNumber);
    }

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.container}>
                <View style={styles.lottieView}>
                    <LottieView
                        style={styles.lottie}
                        source={require("../../assets/petwalk.json")}
                        autoPlay
                        loop
                    />
                </View>
                <Text style={styles.text}>Name</Text>
                <TextInput
                    placeholder="name"
                    style={styles.input}
                    value={nome}
                    autoCapitalize='none'
                    onChangeText={(nome) => setNome(nome)}
                />
                <Text style={styles.text2}>Age</Text>
                <TextInput
                    placeholder="Age"
                    keyboardType="numeric"
                    style={styles.input}
                    value={idade?.toString()}
                    autoCapitalize="none"
                    onChangeText={(idade) => handleIdadeChange(idade)}
                />
                <Text style={styles.text}>Type</Text>
                <TextInput
                    placeholder="type"
                    style={styles.input}
                    value={tipo}
                    autoCapitalize='none'
                    onChangeText={(tipo) => setTipo(tipo)}
                />
                <Text style={styles.text}>Breed</Text>
                <TextInput
                    placeholder="breed"
                    style={styles.input}
                    value={raca}
                    autoCapitalize='none'
                    onChangeText={(raca) => setRaca(raca)}
                />
                {cadastroSucesso && (
                    <Text style={styles.successMessage}>Pet cadastrado com sucesso!</Text>
                )}
                <TouchableOpacity style={styles.add} onPress={handleSubmit}>
                    <Text style={{ color: "#fafafa", fontWeight: 'bold' }}>Add Pet</Text>
                </TouchableOpacity>
                <View style={styles.info}>
                    <Text>Add your</Text>
                    <Text style={styles.texInfo}>Pet</Text>
                    <Text style={styles.texInfo2}>or</Text>
                    <Text style={styles.texInfo}>Pets</Text>
                    <Text style={styles.texInfo2}>:)</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fafafa",
        width: '100%',
        height: '100%'
    },
    input: {
        width: 297,
        height: 46,
        borderRadius: 8,
        backgroundColor: "#D9D9D9",
        padding: 8,
        marginBottom: 10,
    },
    text: {
        marginRight: 250,
        fontSize: 16
    },
    text2: {
        marginRight: 260,
        fontSize: 16
    },
    successMessage: {
        color: 'green',
        marginBottom: 10
    },
    add: {
        backgroundColor: "#7648D4",
        color: "#fafafa",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 20,
        width: 297,
        height: 46,
        alignItems: "center",
        justifyContent: "center",
    },
    info: {
        justifyContent: 'center',
        alignItems: 'center',
        top: 8,
        flexDirection: 'row',
    },
    texInfo: {
        color: '#7648D4',
        marginLeft: 3,
    },
    texInfo2: {
        marginLeft: 3,
        color: 'black'
    },
    lottieView: {
        justifyContent: "center",
        alignItems: "center",
    },
    lottie: {
        width: 150,
        height: 150,
    },
});
