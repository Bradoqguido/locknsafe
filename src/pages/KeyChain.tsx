import React, { useEffect, useState } from 'react';
import { View, FlatList, Alert } from 'react-native';
import {
    Modal,
    Portal,
    TextInput,
    Button,
    Checkbox,
    Title,
    Card,
    Appbar,
    Searchbar,
    Menu,
    IconButton,
    useTheme,
    Snackbar, Dialog, Paragraph, Text, List
} from 'react-native-paper';
import uuid from 'react-native-uuid';
import Clipboard from '@react-native-clipboard/clipboard';
import {globalStyles} from "../lib/styles";
import { useFirebase } from '../hooks/useFirebase';
import { Key } from '../lib/@types/KeyChain';
import {useNavigation} from "@react-navigation/native";
import CardTitle from "react-native-paper/lib/typescript/components/Card/CardTitle";

const KeyChain = () => {
    const theme = useTheme();
    const api = useFirebase();
    const navigator = useNavigation();

    const [keys, setKeys] = useState<Key[]>([]);
    const [filteredKeys, setFilteredKeys] = useState<Key[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearchbar, setShowSearchbar] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [newKeyDescription, setNewKeyDescription] = useState('');
    const [newKeyHash, setNewKeyHash] = useState('');
    const [visibleHash, setVisibleHash] = useState<{ [keyId: string]: boolean }>({});
    const [useUppercase, setUseUppercase] = useState(false);
    const [useLowercase, setUseLowercase] = useState(true); // padrão
    const [useNumbers, setUseNumbers] = useState(false);
    const [useSpecialChars, setUseSpecialChars] = useState(false);
    const [minLength, setMinLength] = useState(8);
    const [maxLength, setMaxLength] = useState(16);

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [item, setItem] = useState<Key | null>(null)

    const showSnackbar = (message: string) => {
        setSnackbarMessage(message);
        setSnackbarVisible(true);
    };

    const hideSnackbar = () => setSnackbarVisible(false);

    const showDialog = () => setDialogVisible(true);

    const hideDialog = () => setDialogVisible(false);

    // Função para carregar as chaves
    const loadKeys = async () => {
        try {
            const allKeys = await api.keyChain.selectAll(api.auth.currentUser?.uid || '');
            setKeys(allKeys);
            setFilteredKeys(allKeys);
        } catch (error) {
            showSnackbar('Erro, Não foi possível carregar as senhas');
        }
    };

    // Função para adicionar uma nova chave
    const addKey = async () => {
        if (!newKeyDescription || !newKeyHash) {
            showSnackbar('Erro, Preencha todos os campos');
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
            await api.keyChain.insert(newKey).then(() => showSnackbar('Senha criada com sucesso!'));
            await loadKeys();
            setNewKeyDescription('');
            setNewKeyHash('');
        } catch (error) {
            showSnackbar('Erro, Não foi possível adicionar a senha');
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
            showSnackbar('Erro, não foi possível editar a senha');
        }
    };

    // Função para excluir uma chave
    const deleteKey = async (id: string) => {
        try {
            await api.keyChain.delete(id);
            await loadKeys();
        } catch (error) {
            showSnackbar('Erro, não foi possível excluir a senha');
        }
    };

    // Função para copiar o hash
    const copyToClipboard = (hash: string) => {
        Clipboard.setString(hash);
        showSnackbar('Copiado, O hash foi copiado para a área de transferência');
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
            showSnackbar('Erro, Selecione ao menos uma opção para gerar o hash.');
            return;
        }

        const hashLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
        let result = '';
        for (let i = 0; i < hashLength; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        setNewKeyHash(result);
    };

    // Função de filtro pelo campo de descrição
    const filterKeys = (query: string) => {
        // Se a query não tiver nada, retorna a lista vazia
        if(query.length === 0) {
            setFilteredKeys(keys)
            setSearchQuery(query);
            return;
        }
        const filtered = keys.filter(key =>
            key.description.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredKeys(filtered);
        setSearchQuery(query);
    };

    const handleLogout = () => {
        closeMenu();
        api.auth.signOut().then(() => {
            showSnackbar(`Até mais tarde, ${api.auth.currentUser && api.auth.currentUser.displayName ? api.auth.currentUser.displayName : ''} !`);
            navigator.navigate(`Login`);
        });
    };

    const handleChangePassphrase = () => {
        closeMenu();
        // TODO: Criar funcionalidade para trocar a frase de segurança e usar isso durante a codigficação do hash
    };

    useEffect(() => {
        loadKeys();
    }, []);

    return (
        <View style={[globalStyles.container, { backgroundColor: theme.colors.background }]}>
            {/* AppBar com botão de busca e menu flutuante */}
            <Appbar.Header>
                <Appbar.Content title="Lista de Senhas" />
                <Appbar.Action icon="plus" onPress={() => setModalVisible(true)} />
                <Appbar.Action icon="magnify" onPress={() => setShowSearchbar(!showSearchbar)} />
                <Appbar.Action icon="refresh" onPress={() => loadKeys()} />
                <Menu
                    visible={menuVisible}
                    onDismiss={closeMenu}
                    anchor={<Appbar.Action icon="dots-vertical" onPress={openMenu} />}>
                    <Menu.Item onPress={handleChangePassphrase} title="Trocar Frase de Segurança" />
                    <Menu.Item onPress={handleLogout} title="Sair" />
                </Menu>
            </Appbar.Header>

            {/* Barra de busca visível ao clicar no ícone de lupa */}
            {showSearchbar && (
                <Searchbar
                    placeholder="Buscar por descrição"
                    onChangeText={filterKeys}
                    value={searchQuery}
                    style={{ margin: 10 }}
                />
            )}

            {/* Lista de Chaves */}
            <FlatList
                data={filteredKeys}
                style={{ margin: 10 }}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Card style={{ marginBottom: 10 }}>
                        <Card.Title title={`${item.description}`}
                                    titleStyle={{ fontSize: 24 }}/>
                        <Card.Content style={{ flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'column', flex: 3 }}>
                                    <Title>Senha: {visibleHash[item.id] ? item.hash : ''}</Title>
                                </View>
                                <View style={{ flexDirection: 'column', flex: 1 }}>
                                    <View style={{ flexDirection: 'row-reverse' }}>
                                        <IconButton
                                            mode="outlined"
                                            icon={'content-copy'}
                                            onPress={() => copyToClipboard(item.hash)} />
                                        <IconButton
                                            mode="outlined"
                                            icon={visibleHash[item.id] ? 'eye-off' : 'eye'}
                                            onPress={() => toggleHashVisibility(item.id)} />
                                    </View>
                                </View>
                            </View>
                        </Card.Content>
                        <Card.Actions>
                            <Button onPress={() => editKey(item.id)}>Editar</Button>
                            <Button onPress={() => {
                                setItem(item)
                                showDialog()
                            }}>Excluir</Button>
                        </Card.Actions>
                    </Card>
                )}
            />

            {/* Modal para criar nova chave */}
            <Portal>
                <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)}>
                    <View style={{ padding: 16, backgroundColor: theme.colors.background, margin: 16, borderRadius: 16 }}>
                        <Title>{item ? 'Editar senha' : 'Criar Nova Senha'}</Title>

                        <View style={{ margin: 8 }}>
                            <TextInput
                                label="Descrição"
                                value={newKeyDescription}
                                onChangeText={setNewKeyDescription}
                                mode="outlined"
                                style={{ marginBottom: 8 }}
                            />
                            <TextInput
                                label={'Senha'}
                                value={newKeyHash}
                                onChangeText={setNewKeyHash}
                                mode="outlined"
                                style={{ marginBottom: 8 }}
                            />
                        </View>

                        <List.AccordionGroup>
                            <View style={{ margin: 16 }}>
                                <List.Accordion title="Gerador de senha" id={1}>
                                    <View style={{ margin: 8 }}>
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
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 8 }}>
                                        <View style={{ flexDirection: 'column', width: '45%' }}>
                                            <Text variant={"bodyMedium"}>Tamanho Mínimo</Text>
                                            <TextInput
                                                placeholder="Tamanho Mínimo"
                                                keyboardType="numeric"
                                                value={String(minLength)}
                                                onChangeText={text => setMinLength(Number(text))}
                                                style={{ borderWidth: 1, padding: 5 }}
                                            />
                                        </View>
                                        <View style={{ flexDirection: 'column', width: '45%' }}>
                                            <Text variant={"bodyMedium"}>Tamanho Máximo</Text>
                                            <TextInput
                                                placeholder="Tamanho Máximo"
                                                keyboardType="numeric"
                                                value={String(maxLength)}
                                                onChangeText={text => setMaxLength(Number(text))}
                                                style={{ borderWidth: 1, padding: 5 }}
                                            />
                                        </View>
                                    </View>
                                    <View style={[globalStyles.center, { flexDirection: 'row' }]}>
                                        <Button onPress={generateHash} mode="contained-tonal" style={{ margin: 8, width: '50%' }}>Gerar Senha</Button>
                                    </View>
                                </List.Accordion>
                            </View>
                        </List.AccordionGroup>


                        <View style={[globalStyles.center, { flexDirection: 'row' }]}>
                            <Button onPress={() => setModalVisible(false)} mode="outlined" style={{ margin: 8, width: '45%' }} >Cancelar</Button>
                            <Button onPress={addKey} mode="contained" style={{ margin: 8, width: '45%' }}>Criar Senha</Button>
                        </View>

                    </View>
                </Modal>

                <Dialog visible={dialogVisible} onDismiss={hideDialog}>
                    <Dialog.Title>Confirmação</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Deseja realmente excluir esta senha?</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => {
                            hideDialog()
                            setItem(null)
                        }}>Cancelar</Button>
                        <Button onPress={() => {
                            hideDialog();
                            if (item) deleteKey(item.id)
                        }}>
                            Confirmar
                        </Button>
                    </Dialog.Actions>
                </Dialog>

                <Snackbar
                    visible={snackbarVisible}
                    onDismiss={hideSnackbar}
                    action={{
                        label: 'Ok',
                        onPress: () => {
                            hideSnackbar();
                        },
                    }}>
                    {snackbarMessage}
                </Snackbar>
            </Portal>
        </View>
    );
};

export default KeyChain
