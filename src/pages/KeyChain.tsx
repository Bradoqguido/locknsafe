import React, { useEffect, useState } from 'react';
import { View, FlatList, Alert } from 'react-native';
import {Modal, Portal, Text, TextInput, Button, Checkbox, Title, Card} from 'react-native-paper';
import uuid from 'react-native-uuid';
import Clipboard from '@react-native-clipboard/clipboard';
import {globalStyles} from "../lib/styles";
import { useFirebase } from '../hooks/useFirebase';
import { Key } from '../lib/@types/KeyChain';

const KeyChain = () => {
    const api = useFirebase();
    const [keys, setKeys] = useState<Key[]>([]);
    const [newKeyDescription, setNewKeyDescription] = useState('');
    const [newKeyHash, setNewKeyHash] = useState('');
    const [visibleHash, setVisibleHash] = useState<{ [keyId: string]: boolean }>({});
    const [modalVisible, setModalVisible] = useState(false);
    const [useUppercase, setUseUppercase] = useState(false);
    const [useLowercase, setUseLowercase] = useState(true); // padrão
    const [useNumbers, setUseNumbers] = useState(false);
    const [useSpecialChars, setUseSpecialChars] = useState(false);
    const [minLength, setMinLength] = useState(8);
    const [maxLength, setMaxLength] = useState(16);

    // Função para carregar as chaves
    const loadKeys = async () => {
        try {
            const allKeys = await api.keyChain.selectAll(api.auth.currentUser?.uid || '');
            setKeys(allKeys);
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar as chaves');
        }
    };

    // Função para adicionar uma nova chave
    const addKey = async () => {
        if (!newKeyDescription || !newKeyHash) {
            Alert.alert('Erro', 'Preencha todos os campos');
            return;
        }
        const newKey: Key = {
            id: uuid.v4().toString(), // Gera ID aleatório
            uid: api.auth.currentUser?.uid || '',
            hash: newKeyHash,
            description: newKeyDescription,
            created_at: new Date(),
            updated_at: new Date(),
        };
        try {
            await api.keyChain.insert(newKey);
            await loadKeys();
            setNewKeyDescription('');
            setNewKeyHash('');
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível adicionar a chave');
        } finally {
            setModalVisible(false)
        }
    };

    // Função para editar uma chave
    const editKey = async (id: string) => {
        const updatedDescription = prompt('Nova descrição:');
        if (!updatedDescription) return;

        try {
            const keyToUpdate = keys.find(k => k.id === id);
            if (!keyToUpdate) return;

            const updatedKey = {
                ...keyToUpdate,
                description: updatedDescription,
                updated_at: new Date(),
            };
            await api.keyChain.update(updatedKey);
            loadKeys();
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível editar a chave');
        }
    };

    // Função para excluir uma chave
    const deleteKey = async (id: string) => {
        try {
            await api.keyChain.delete(id);
            loadKeys();
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível excluir a chave');
        }
    };

    // Função para copiar o hash
    const copyToClipboard = (hash: string) => {
        Clipboard.setString(hash);
        Alert.alert('Copiado', 'O hash foi copiado para a área de transferência');
    };

    // Função para alternar a visibilidade do hash
    const toggleHashVisibility = (keyId: string) => {
        setVisibleHash(prevState => ({
            ...prevState,
            [keyId]: !prevState[keyId],
        }));
    };

    // Função para gerar hash baseado nas opções
    const generateHash = () => {
        let characters = '';
        if (useLowercase) characters += 'abcdefghijklmnopqrstuvwxyz';
        if (useUppercase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (useNumbers) characters += '0123456789';
        if (useSpecialChars) characters += '!@#$%^&*()_+[]{}|;:,.<>?';

        if (!characters) {
            Alert.alert('Erro', 'Selecione ao menos uma opção para gerar o hash.');
            return;
        }

        const hashLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
        let result = '';
        for (let i = 0; i < hashLength; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        setNewKeyHash(result);
    };

    useEffect(() => {
        loadKeys();
    }, []);

    return (
        <View style={globalStyles.container}>
            <Title>Lista de Chaves</Title>
            <FlatList
                data={keys}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Card style={{ marginBottom: 10 }}>
                        <Card.Content>
                            <Title>Descrição: {item.description}</Title>
                            <Button
                                mode="outlined"
                                onPress={() => toggleHashVisibility(item.id)}
                            >
                                {visibleHash[item.id] ? 'Ocultar Hash' : 'Mostrar Hash'}
                            </Button>
                            {visibleHash[item.id] && (
                                <View>
                                    <Text>Hash: {item.hash}</Text>
                                    <Button mode="contained" onPress={() => copyToClipboard(item.hash)}>
                                        Copiar
                                    </Button>
                                </View>
                            )}
                        </Card.Content>
                        <Card.Actions>
                            <Button onPress={() => console.log('Editar')}>Editar</Button>
                            <Button onPress={() => console.log('Excluir')}>Excluir</Button>
                        </Card.Actions>
                    </Card>
                )}
            />

            <Button mode="contained" onPress={() => setModalVisible(true)}>
                Adicionar Nova Chave
            </Button>

            {/* Modal para criar nova chave */}
            <Portal>
                <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)}>
                    <View style={{ padding: 20, backgroundColor: 'white', margin: 20 }}>
                        <Title>Criar Nova Chave</Title>
                        <TextInput
                            label="Descrição"
                            value={newKeyDescription}
                            onChangeText={setNewKeyDescription}
                            mode="outlined"
                            style={{ marginBottom: 10 }}
                        />
                        <TextInput
                            label="Hash Gerado"
                            value={newKeyHash}
                            onChangeText={setNewKeyHash}
                            mode="outlined"
                            disabled
                            style={{ marginBottom: 10 }}
                        />

                        <View>
                            <Checkbox.Item
                                label="Usar Letras Maiúsculas"
                                status={useUppercase ? 'checked' : 'unchecked'}
                                onPress={() => setUseUppercase(!useUppercase)}
                            />
                            <Checkbox.Item
                                label="Usar Letras Minúsculas"
                                status={useLowercase ? 'checked' : 'unchecked'}
                                onPress={() => setUseLowercase(!useLowercase)}
                            />
                            <Checkbox.Item
                                label="Usar Números"
                                status={useNumbers ? 'checked' : 'unchecked'}
                                onPress={() => setUseNumbers(!useNumbers)}
                            />
                            <Checkbox.Item
                                label="Usar Caracteres Especiais"
                                status={useSpecialChars ? 'checked' : 'unchecked'}
                                onPress={() => setUseSpecialChars(!useSpecialChars)}
                            />
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                            <TextInput
                                placeholder="Tamanho Mínimo"
                                keyboardType="numeric"
                                value={String(minLength)}
                                onChangeText={text => setMinLength(Number(text))}
                                style={{ borderWidth: 1, padding: 5, width: '45%' }}
                            />
                            <TextInput
                                placeholder="Tamanho Máximo"
                                keyboardType="numeric"
                                value={String(maxLength)}
                                onChangeText={text => setMaxLength(Number(text))}
                                style={{ borderWidth: 1, padding: 5, width: '45%' }}
                            />
                        </View>

                        <Button onPress={generateHash} mode="contained" style={{ marginBottom: 10 }}>
                            Gerar Hash
                        </Button>
                        <Button onPress={addKey} mode="contained">
                            Criar Chave
                        </Button>
                    </View>
                </Modal>
            </Portal>
        </View>
    );
};

export default KeyChain
