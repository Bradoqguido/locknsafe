import { Firestore } from "firebase/firestore";
import { Auth } from "firebase/auth";
import {KeyChain} from "./models/keyChain";
import { FirebaseApp } from "firebase/app";
import {authProviderGoogle} from "../../../firebaseConfig";
import { FirebaseStorage } from "firebase/storage";
import firebase from "firebase/compat";
import User = firebase.User;

export class Api {
    firebaseApp: FirebaseApp
    auth: Auth
    user: User | null = null
    storage: FirebaseStorage
    keyChain: KeyChain

    constructor(firebaseApp: FirebaseApp, auth: Auth, db: Firestore, storage: FirebaseStorage) {
        this.firebaseApp = firebaseApp
        this.auth = auth
        this.storage = storage
        this.keyChain = new KeyChain(db, 'keychain')
    }

    setUser(user: User): void {
        this.user = user
    }

    getUser(): User | null {
        return this.user
    }
}
