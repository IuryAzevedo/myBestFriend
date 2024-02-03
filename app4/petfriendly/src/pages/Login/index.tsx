import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import LottieView from "lottie-react-native";
import { AntDesign } from "@expo/vector-icons";

function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLoginPress = () => {
    //@ts-ignore
    navigation.navigate("Main");
  };
  const handleRegisterPress = () => {
    ///@ts-ignore
    navigation.navigate("Register");
  };
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <View style={styles.lottieView}>
          <LottieView
            style={styles.lottie}
            source={require("../../assets/cat.json")}
            autoPlay
            loop
          />
        </View>
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
          secureTextEntry
        />

        <TouchableOpacity style={styles.login} onPress={handleLoginPress}>
          <Text style={{ color: "#fafafa" }}>Login</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            style={styles.textRegister}
            onPress={handleRegisterPress}
          >
            <Text>Don't have a registration yet?</Text>
            <Text style={styles.press}>Press here!</Text>
          </TouchableOpacity>
        </View>
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
  register: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    padding: 5,
  },
  textRegister: {
    marginTop: 20,
    fontSize: 15,
    alignItems: "center",
    flexDirection: "row",
  },
  press: {
    color: "#7648D4",
    marginLeft: 3,
  },
  lottieView: {
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    width: 200,
    height: 200,
  },
});

export default Login;
