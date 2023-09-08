import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { AuthContext } from './AuthContext';
import { IAuthProvider, IUser } from '../auth/type_auth';
import { LoginRequest, getUserLocalStorage, setUserLocalStorage } from '../auth/Utils';

export function AuthProvider({
    children
}: IAuthProvider){
    const navigate = useNavigate()
    const [user, setUser] = useState<IUser | null>()

    async function Register(
        account: ObjectConstructor
    ){
        // main function's auth REGISTER system
        console.log(account)
    }

    async function Authenticate(
        email: string,
        password: string
    ){
        // main function's auth login system

        const response = await LoginRequest(email, password)
        // console.log(response)

        const payload = {token: response.token, email}
        setUser(payload)
        setUserLocalStorage(payload)
        navigate('/')
    }

    function Logout(){
        setUser(null)
        setUserLocalStorage(null)
    }

    useEffect(() => {
        const user = getUserLocalStorage()

        if(user){
            navigate('/')
            setUser(user)
        }
    }, [])

    return(
        <AuthContext.Provider value={{...user, Authenticate, Register, Logout}}>
            {children}
        </AuthContext.Provider>
    )
}