import { Platform } from "react-native";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import{ initializeAuth, GoogleAuthProvider, inMemoryPersistence, getReactNativePersistence }from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import env from './env.json'

// Initialize Firebase
export const firebaseApp = initializeApp(env.firebaseConfig);
const analytics = getAnalytics(firebaseApp);

const persistence = Platform.OS === 'web' ? inMemoryPersistence : getReactNativePersistence(AsyncStorage);
export const auth = initializeAuth(firebaseApp, { persistence });

export const db = getFirestore(firebaseApp);
export const authProviderGoogle = new GoogleAuthProvider();
export const storage = getStorage(firebaseApp, `gs://${env.firebaseConfig.storageBucket}`);
