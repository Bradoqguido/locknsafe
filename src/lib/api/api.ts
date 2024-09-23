import { Firestore } from "firebase/firestore";
import { Auth } from "firebase/auth";
import {KeyChain} from "./models/keyChain";

export class Api {
    keyChain: KeyChain;

    constructor(db: Firestore, auth: Auth) {
        this.keyChain = new KeyChain(db, 'keychain')
    }
}
