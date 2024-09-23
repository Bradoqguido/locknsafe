import Crud from "./crud";
import {Firestore} from "firebase/firestore";
import {Key} from "../../@types/keychain";

export class KeyChain extends Crud<Key> {
    constructor (db: Firestore ,collection: string) {
        super(db, collection);
    }
}
