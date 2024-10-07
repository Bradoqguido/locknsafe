import {ScrollView, Linking, View} from 'react-native';
import {Text, Button, Divider, Title, Paragraph, List, Avatar, useTheme, Appbar} from 'react-native-paper';
import {globalStyles} from "../lib/styles";
import {useNavigation} from "@react-navigation/native";
import React from "react";

const About = () => {
    const theme = useTheme()
    const navigation = useNavigation()

    const buttonAccessNow = () => (
        <View style={[globalStyles.center, { marginVertical: 16}]}>
            <Button mode="contained" onPress={() => navigation.navigate('Login')}>
                Acessar agora
            </Button>
        </View>
    )

    return (
        <ScrollView style={{ padding: 20, backgroundColor: theme.colors.background }}>
            <Appbar.Header>
                <Appbar.Content title="LocknSafe" />
                <Appbar.Action icon={'account'} onPress={() => navigation.navigate('Login')} />
            </Appbar.Header>

            <View style={globalStyles.center}>
                <Avatar.Image
                    size={160}
                    style={{marginBottom: 30}}
                    source={require('../../assets/icon.png')}
                />
            </View>

            <View style={globalStyles.headerContainer}>
                <Text style={[globalStyles.headerText, { color: theme.colors.primary }]}>LocknSafe</Text>
                <Text style={globalStyles.subHeaderText}>A maneira mais segura de gerenciar suas senhas</Text>
                {buttonAccessNow()}
            </View>

            <Paragraph style={{ textAlign: 'center', marginVertical: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Proteja suas informações pessoais com facilidade e segurança.</Text>{'\n'}
                No mundo digital de hoje, manter suas senhas seguras é essencial. Com o <Text style={{ fontWeight: 'bold' }}>LocknSafe</Text>,
                você pode armazenar todas as suas senhas em um só lugar, de maneira organizada e protegida, sem o estresse de tentar se lembrar de todas.
            </Paragraph>

            <View style={[globalStyles.center , {marginVertical: 10}]}>
                <Title>Por que escolher o LocknSafe?</Title>
                <List.Section>
                    <List.Item
                        title="Segurança de última geração"
                        description="Armazene suas senhas com criptografia avançada, garantindo que só você tenha acesso."
                        left={() => <List.Icon icon="shield-lock" />}
                    />
                    <List.Item
                        title="Acesso rápido e fácil"
                        description="Encontre rapidamente suas senhas com uma interface intuitiva e de fácil navegação."
                        left={() => <List.Icon icon="flash" />}
                    />
                    <List.Item
                        title="Organização inteligente"
                        description="Categorize suas senhas por tipo de serviço, como redes sociais ou contas bancárias."
                        left={() => <List.Icon icon="folder" />}
                    />
                    <List.Item
                        title="Gerador de senhas seguras"
                        description="Crie senhas fortes e seguras para suas novas contas com apenas um clique."
                        left={() => <List.Icon icon="key" />}
                    />
                    <List.Item
                        title="Acesso multiplataforma"
                        description="Disponível para dispositivos Android, iOS e Web, para que você tenha suas senhas sempre à mão."
                        left={() => <List.Icon icon="devices" />}
                    />
                    <List.Item
                        title="Backup automático"
                        description="Sincronize e faça backup de suas senhas na nuvem para nunca perder suas informações."
                        left={() => <List.Icon icon="cloud-upload" />}
                    />
                </List.Section>
            </View>

            <View style={{ justifyContent: 'space-between', alignSelf: 'center', marginVertical: 10 }}>
                <Title style={{textAlign: 'center'}}>Como funciona?</Title>
                <Paragraph>1. <Text style={{ fontWeight: 'bold' }}>Cadastre-se:</Text> Crie sua conta e comece a usar o LocknSafe em minutos.</Paragraph>
                <Paragraph>2. <Text style={{ fontWeight: 'bold' }}>Adicione suas senhas:</Text> Armazene todas as suas senhas em um ambiente seguro.</Paragraph>
                <Paragraph>3. <Text style={{ fontWeight: 'bold' }}>Gerencie com facilidade:</Text> Organize, edite e acesse suas senhas em poucos cliques.</Paragraph>
            </View>

            <View style={[globalStyles.center, {marginVertical: 10}]}>
                <Title>Sua privacidade é nossa prioridade</Title>
                <Paragraph style={{ textAlign: 'justify' }}>
                    No <Text style={{ fontWeight: 'bold' }}>LocknSafe</Text>, levamos sua privacidade a sério. Suas senhas são criptografadas e armazenadas com segurança, e você é o único que pode acessá-las.
                    Nem mesmo nossa equipe tem acesso às suas informações.
                </Paragraph>
            </View>
        </ScrollView>
    );
}

export default About
