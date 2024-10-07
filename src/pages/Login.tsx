import React, {useState} from "react";
import {KeyboardAvoidingView, Text, View, StyleSheet} from "react-native";
import {Avatar, Button, useTheme} from "react-native-paper";
import UserInfo from "../components/UserInfo";
import {signInWithPopup} from "firebase/auth";
import {authProviderGoogle} from "../../firebaseConfig";
import firebase from "firebase/compat";
import User = firebase.User;
import {useFirebase} from "../hooks/useFirebase";
import {globalStyles} from "../lib/styles";
import {useNavigation} from "@react-navigation/native";

const Login = () => {
    const api = useFirebase()
    const theme = useTheme()
    const navigator = useNavigation()

    return (
        <KeyboardAvoidingView behavior="padding" style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={globalStyles.center}>
                <Avatar.Image
                    size={160}
                    style={{marginBottom: 30}}
                    source={require('../../assets/icon.png')}
                />

                <View style={globalStyles.headerContainer}>
                    <Text style={[globalStyles.headerText, { color: theme.colors.primary }]}>LocknSafe</Text>
                    <Text style={[globalStyles.subHeaderText, { color: theme.colors.secondary }]}>A maneira mais segura de gerenciar suas senhas</Text>
                </View>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Button
                        style={styles.button}
                        mode={"contained"}
                        onPress={() => {
                            signInWithPopup(api.auth, authProviderGoogle)
                                .then((userCredential) => {
                                    navigator.navigate('KeyChain')
                                })
                                .catch((error) => {
                                    console.error('erro ao fazer login.', {error})
                                })
                        }}>Login com Google</Button>

                    <Button onPress={() => navigator.goBack()}>Sobre nós</Button>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    formContainer: {
        width: '100%',
    },
    input: {
        marginBottom: 16,
        backgroundColor: '#fff',
    },
    button: {
        marginVertical: 16,
    },
    buttonContent: {
        paddingVertical: 8,
    }
});
