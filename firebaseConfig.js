import { Platform } from "react-native";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import{ initializeAuth, GoogleAuthProvider, inMemoryPersistence, getReactNativePersistence }from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebaseConfig from './firebaseConfig.json'

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const persistence = Platform.OS === 'web' ? inMemoryPersistence : getReactNativePersistence(AsyncStorage);
export const auth = initializeAuth(app, { persistence });

export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
export const database = db;
export const storage = getStorage(app, `gs://${firebaseConfig.storageBucket}`);
