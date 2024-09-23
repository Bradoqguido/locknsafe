import { useContext } from "react"
import { FirebaseContext } from "../contexts/firebaseContext"

export const useFirebase = () => {
    const context = useContext(FirebaseContext)

    if (!context) {
        throw new Error('useFirebase only can be used inside FirebaseContext!')
    }

    return context.api
}
