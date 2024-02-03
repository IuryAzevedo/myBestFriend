import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";

function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLoginPress = () => {
    //@ts-ignore
    navigation.navigate("Main");
  };

  return (
    <View style={styles.container}>
        <TextInput placeholder="email"
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        />
        <TextInput placeholder="password"
        style={styles.input}
        value={password}
        onChangeText={(password) => setPassword(password)}/>

      <TouchableOpacity style={styles.login} onPress={handleLoginPress}>
        <Text style={{ color: "#fafafa" }}>Login</Text>
      </TouchableOpacity>
    </View>
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
    backgroundColor: 'blue',
    color: '#fafafa',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    width: 297,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 297,
    height: 46,
    borderRadius: 8,
    backgroundColor: '#D9D9D9',
    padding: 20,
    marginBottom: 10
  }
});

export default Login;
