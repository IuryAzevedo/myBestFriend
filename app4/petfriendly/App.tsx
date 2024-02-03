import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import Routes from './src/routes';
// import Login from './src/pages/Login';
import { AppNavigator } from './src/routes';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator/>
    </NavigationContainer>
  );
}
