import { useState, useEffect } from 'react'

import { AuthContext } from './AuthContext';
import { getUserLocalStorage } from '../auth/Utils';
import { IAuthProvider, IUser } from '../auth/type_auth';

export function AuthProvider({
    children
}: IAuthProvider){
    const [user, setUser] = useState<IUser | null>()

    async function Authenticate(
        user: string,
        password: string
    ){
        console.log(`${user} - ${password}`)
    }

    function Logout(){
        setUser(null)
    }

    useEffect(() => {
        const user = getUserLocalStorage()

        if(user){
            setUser(user)
        }
    }, [])

    return(
        <AuthContext.Provider value={{...user, Authenticate, Logout}}>
            {children}
        </AuthContext.Provider>
    )
}