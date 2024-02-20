import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Keyboard, TouchableWithoutFeedback, SafeAreaView, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, TextInput, } from "react-native-gesture-handler";
import LottieView from "lottie-react-native";
import { Ionicons } from '@expo/vector-icons';
import { api } from "../../services/api";
import { Toast } from 'toastify-react-native';
import { AuthContext } from "../../context/AuthContext";
import { Animations } from 'react-native-modal'
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from 'expo-image-picker';
import { Image } from "react-native";


function Register() {
  const navigation = useNavigation();
  const { singIn } = useContext(AuthContext);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);

  const pickPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log("resultado: ", result);

    if (!result.canceled) {
      setPhoto(result.assets[0].uri)
    }

  }

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    console.log("resultado da camera: ", result);

    if (!result.canceled) {
      setPhoto(result.assets[0].uri)
    }

  }


  async function handleRegister() {
    if (nome === "" || email === "" || password === "") {
      Toast.warn("Preencha todos os campos!", 'top  ')
    }
    try {
      console.log('tentando registrar');
      const response = await api.post('/users', { nome, email, password, photo })
      console.log("Resposta do servidor:", response);
      if (response.status === 200) {
        Toast.success('Registro bem sucedido', 'top')
        singIn({ email, password })
        handleLoginPress();
      } else {
        console.log('O registro falhou, tente novamente!');
        Toast.error('O registro falhou, tente novamente!', 'top');
      }
    } catch (error) {
      console.log('Erro durante o registro', error);
      Toast.warn('O registro falhou otário', 'top')
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
  const toggleShowPassword = () => {
    //@ts-ignore
    setShowPassword(!showPassword);
  };

  const dismissKeyboard = () => {

    Keyboard.dismiss();
  };

  return (

    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <View style={styles.goBackButton}>
          <TouchableOpacity style={styles.goBackButton} onPress={handleGoback}>
            <Ionicons name="chevron-back-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* <View style={styles.lottieView}>
          <LottieView
            style={styles.lottie}
            source={require("../../assets/dog.json")}
            autoPlay
            loop
          />
        </View> */}
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          {photo && <Image source={{ uri: photo }} style={{
            width: 200,
            height: 200,
            borderRadius: 8,
             }} />}
        </View>
        <View style={styles.photoContainer}>
          <TouchableOpacity onPress={pickPhoto} style={{ width: 100, height: 40, backgroundColor: '#7648D4', borderRadius: 8, }}>
            <Text style={{ color: 'white', fontWeight: 'bold', textAlign: "center", top: 10 }}>from gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={takePhoto} style={{ width: 100, height: 40, backgroundColor: '#7648D4', borderRadius: 8, }}>
            <Text style={{ color: 'white', fontWeight: 'bold', textAlign: "center", top: 10 }}>Take a photo</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.namesInputs}>Name</Text>
        <TextInput
          placeholder="name" autoCapitalize='none'
          style={styles.input} maxLength={50}
          value={nome}
          onChangeText={(nome) => setNome(nome)}
        />
        <Text style={styles.namesInputs}>Email</Text>
        <TextInput
          placeholder="email" autoCapitalize='none'
          style={styles.input} keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text style={styles.namesInputsP}>Password</Text>
        <View style={styles.passContainer}>
          <TextInput
            placeholder="password"
            style={styles.input} maxLength={20}
            value={password}
            onChangeText={(password) => setPassword(password)}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity style={styles.eyeIcon} onPress={toggleShowPassword}>
            <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="black" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.login} onPress={handleRegister}>
          <Text style={{ color: "#fafafa" }}>Register</Text>
        </TouchableOpacity>
        <Text style={styles.info}>Register your account, if you don't have!</Text>
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
    paddingBottom: 20,
  },
  photoContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 100,
    gap: 5,
    top: 100,
    marginBottom: 50
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
    top: 40,
    left: 20
  },
  passContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 10
  },
  namesInputs: {
    marginRight: 250
  },
  namesInputsP: {
    marginRight: 230
  },
  info: {
    top: 5
  },

});

export default Register;
