import * as Google from 'expo-auth-session/providers/google';
import { useEffect, useState } from 'react';
import {useFirebase} from "./useFirebase";
import {GoogleAuthProvider, signInWithCredential} from "firebase/auth";
import firebase from "firebase/compat";
import User = firebase.User;
import env from '../../env.json'

export const useGoogleAuth = () => {
    const api = useFirebase()
    const [user, setUser] = useState<User | null>(null);

    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: env.expoClientId, webClientId: env.googleWebClientIdSDK
    });

    useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;

            const credential = GoogleAuthProvider.credential(id_token);
            signInWithCredential(api.auth, credential).then((userCredential) => {
                setUser(userCredential.user as User);
            });
        }
    }, [response]);

    const signOut = () => {
        firebase.auth().signOut().then(() => {
            setUser(null);
        });
    };

    return { user, signOut, request, promptAsync };
};
