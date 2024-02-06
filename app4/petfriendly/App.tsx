import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import Routes from './src/routes';
// import Login from './src/pages/Login';
import { AppNavigator } from './src/routes';
import { AuthProvider } from './src/context/AuthContext';
import ToastManager, { Toast } from 'toastify-react-native';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <ToastManager duration={2000}/>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}
