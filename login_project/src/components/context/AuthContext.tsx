import { createContext } from 'react'
import { IContext } from "../auth/type_auth";

export const AuthContext = createContext<IContext>({} as IContext)