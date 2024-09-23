import { collection, setDoc, getDocs, doc, deleteDoc, updateDoc, query, Firestore, getDoc, where } from "firebase/firestore";
import {ICrud} from "../../@types/ICrud";

export default class Crud<T> implements ICrud<T>{
    protected collectionRef;

    constructor(db: Firestore , collectionName: string) {
        this.collectionRef = collection(db, collectionName)
    }

    protected doErrorCheck = (error: any, method: string): void => {
        const message: string = `Got a error executing: ${method}.`
        console.error(message, error)
        throw new Error(message)
    }

    async insert(item: any): Promise<void> {
        try {
            const docRef = doc(this.collectionRef, item.id)
            await setDoc(docRef, item, { merge: true })
        } catch (error: any) {
            throw this.doErrorCheck(error, 'insert')
        }
    }

    async selectAll(): Promise<T[]> {
        try {
            const records: T[] = []
            const q = query(this.collectionRef)
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach(doc => {
                records.push({
                    ...doc.data() as T,
                    id: doc.id
                })
            })
            return records
        } catch (error) {
            throw this.doErrorCheck(error, 'selectAll')
        }
    }

    async select(id: string): Promise<T> {
        try {
            const docRef = doc(this.collectionRef, id)
            const docSnapshot = await getDoc(docRef)
            const item: any = docSnapshot.data() as T
            item.id = docSnapshot.id
            return item
        } catch (error: any) {
            throw this.doErrorCheck(error, 'select')
        }
    }

    async update(item: any): Promise<void> {
        try {
            const docRef = doc(this.collectionRef, item.id)
            await updateDoc(docRef, item)
        } catch (error: any) {
            throw this.doErrorCheck(error, 'update')
        }
    }

    async delete(id: string): Promise<void> {
        try {
            const docRef = doc(this.collectionRef, id)
            await deleteDoc(docRef)
        } catch (error: any) {
            throw this.doErrorCheck(error, 'delete')
        }
    }
}
