// routes.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, MaterialCommunityIcons, Fontisto, FontAwesome } from '@expo/vector-icons';

import Home from './pages/Home';
import Portion from './pages/Portion';
import User from './pages/User';
import Historic from './pages/Historic';
import Pet from './pages/Pet';
import Login from './pages/Login';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const MainTabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        backgroundColor: '#fafafa',
        paddingTop: 5,
      },
      tabBarLabelStyle: {
        color: '#121212',
      },
      tabBarActiveTintColor: '#7648D4',
    }}
  >
    <Tab.Screen
      name="Portion"
      component={Portion}
      options={{
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="food-drumstick" size={24} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Pet"
      component={Pet}
      options={{
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <MaterialIcons name="pets" size={24} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <Fontisto name="home" size={24} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="User"
      component={User}
      options={{
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <FontAwesome name="user" size={24} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Historic"
      component={Historic}
      options={{
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <FontAwesome name="history" size={24} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

export const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
    <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }} />
  </Stack.Navigator>
);
