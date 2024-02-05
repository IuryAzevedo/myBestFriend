import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TextInput, } from "react-native-gesture-handler";
import LottieView from "lottie-react-native";
import { Ionicons } from '@expo/vector-icons';
import { api } from "../../services/api";
import ToastManager, { Toast } from 'toastify-react-native';
import { AuthContext } from "../../context/AuthContext";
import {Animations} from 'react-native-modal'




function Register() {
  const navigation = useNavigation();
  const { singIn } = useContext(AuthContext);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  async function handleRegister() {
    if (nome === "" || email === "" || password === "") {
      Toast.warn("Preencha todos os campos!", 'center')
    }
    try {
      console.log('tentando registrar');
      const response = await api.post('/users', { nome, email, password })
      console.log("Resposta do servidor:", response);
      if (response.status === 200) {
        Toast.success('Registro bem sucedido', 'center')
        singIn({ email, password })
        handleLoginPress()

      } else {
        console.log('O registro falhou, tente novamente!');
        Toast.error('O registro falhou, tente novamente!', 'center');
      }

    } catch (error) {
      console.log('Erro durante o registro', error);
      Toast.warn('O registro falhou devido a um erro de rede', 'center')
    }
  }



  const handleLoginPress = () => {
    //@ts-ignore
    navigation.navigate("Login");
  };

  const handleGoback = () => {
    //@ts-ignore
    navigation.navigate('Login')
  }

  const dismissKeyboard = () => {

    Keyboard.dismiss();
  };

  return (

    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <View style={styles.goBackButton}>
          <TouchableOpacity onPress={handleGoback}>
            <Ionicons nome="chevron-back" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.lottieView}>
          <LottieView
            style={styles.lottie}
            source={require("../../assets/dog.json")}
            autoPlay
            loop
          />
        </View>
        <TextInput
          placeholder="nome"
          style={styles.input}
          value={nome}
          onChangeText={(nome) => setNome(nome)}
        />
        <TextInput
          placeholder="email"
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="password"
          style={styles.input}
          value={password}
          onChangeText={(password) => setPassword(password)}
        />

        <TouchableOpacity style={styles.login} onPress={handleRegister}>
          <Text style={{ color: "#fafafa" }}>Register</Text>
        </TouchableOpacity>
      <ToastManager animationOutTiming={5000}/>
      </View>

    </TouchableWithoutFeedback>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fafafa",
  },
  text: {
    fontSize: 15,
    alignItems: "center",
  },
  login: {
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
  input: {
    width: 297,
    height: 46,
    borderRadius: 8,
    backgroundColor: "#D9D9D9",
    padding: 8,
    marginBottom: 10,
  },
  lottieView: {
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    width: 200,
    height: 200,
  },
  goBackButton: {
    position: 'absolute',
    top: 80,
    left: 40
  }
});

export default Register;
