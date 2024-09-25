import React from 'react';
import { Button, Text, View } from 'react-native';
import firebase from "firebase/compat";
import User = firebase.User;

interface UserInfoProps {
    user: User;
    onSignOut: () => void;
}

const UserInfo: React.FC<UserInfoProps> = ({ user, onSignOut }) => {
    return (
        <View>
            <Text>Bem-vindo, {user.displayName}!</Text>
            <Button title="Sair" onPress={onSignOut} />
        </View>
    );
};

export default UserInfo;
