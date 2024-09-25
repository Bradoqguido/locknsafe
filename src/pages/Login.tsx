import React, {useState} from "react";
import {Text, View} from "react-native";
import {globalStyles} from "../lib/styles";
import * as Google from 'expo-auth-session/providers/google';
import {Button} from "react-native-paper";
import {useGoogleAuth} from "../hooks/useGoogleAuth";
import UserInfo from "../components/UserInfo";

export const Login = () => {
    const { user, signOut, request, promptAsync } = useGoogleAuth();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {user ? (
                <UserInfo user={user} onSignOut={signOut} />
            ) : (
                <Button disabled={!request} onPress={() => promptAsync()}>Login com Google</Button>
            )}
        </View>
    );
}
