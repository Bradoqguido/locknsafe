import React from "react";
import {StatusBar} from 'expo-status-bar';

import {PaperProvider} from "react-native-paper";
import {useColorScheme} from "react-native";
import Theme from './src/lib/theme'

import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import {Login} from "./src/pages/Login";
import {KeyChain} from "./src/pages/KeyChain";
import {Settings} from './src/pages/Settings';
import {FirebaseContext} from "./src/contexts/firebaseContext";
import {Api} from "./src/lib/api/api";
import {auth, db, firebaseApp, storage} from "./firebaseConfig";

export default function App() {
  const api: Api = new Api(firebaseApp, auth, db, storage)
  const colorScheme = useColorScheme()
  const theme= colorScheme === 'dark' ? Theme.darkTheme : Theme.lightTheme
  const Stack = createNativeStackNavigator()

  const getInitialRoute = (): string => {
      return 'Login'
  }

  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <StatusBar style="auto" />
        <FirebaseContext.Provider value={{ api }}>
          <Stack.Navigator initialRouteName={getInitialRoute()}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Keys" component={KeyChain} />
            <Stack.Screen name="Settings" component={Settings} />
          </Stack.Navigator>
        </FirebaseContext.Provider>
      </PaperProvider>
    </NavigationContainer>
  );
}
