import React from "react";
import {StatusBar} from 'expo-status-bar';

import {PaperProvider} from "react-native-paper";
import {useColorScheme} from "react-native";
import Theme from './src/lib/theme'

import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";


import {FirebaseContext} from "./src/contexts/firebaseContext";
import {Api} from "./src/lib/api/api";
import {auth, db, firebaseApp, storage} from "./firebaseConfig";

import Login from "./src/pages/Login";
import KeyChain from "./src/pages/KeyChain";
import Settings from './src/pages/Settings';
import About from "./src/pages/About";

export default function App() {
  const api: Api = new Api(firebaseApp, auth, db, storage)
  const colorScheme = useColorScheme()
  const theme= colorScheme === 'dark' ? Theme.darkTheme : Theme.lightTheme
  const Stack = createNativeStackNavigator()

  const getInitialRoute = (): string => {
      return 'About'
  }

  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <StatusBar style="auto" />
        <FirebaseContext.Provider value={{ api }}>
          <Stack.Navigator initialRouteName={getInitialRoute()} screenOptions={{ headerTintColor: theme.colors.primary }}>
            <Stack.Screen name="About" component={About} options={{ title: 'LocknSafe' }} />
            <Stack.Screen name="Login" component={Login} options={{ title: 'Acesso' }} />
            <Stack.Screen name="KeyChain" component={KeyChain} options={{ title: 'Chaveiro', headerBackButtonMenuEnabled: false }} />
            <Stack.Screen name="Settings" component={Settings} options={{ title: 'Configurações' }} />
          </Stack.Navigator>
        </FirebaseContext.Provider>
      </PaperProvider>
    </NavigationContainer>
  );
}
