import { createContext } from 'react'
import { Api } from '../lib/api/api'

export const FirebaseContext = createContext<{ api: Api } | undefined>(undefined)
