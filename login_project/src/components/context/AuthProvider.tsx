import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { AuthContext } from './AuthContext';
import { IAuthProvider, IUser } from '../auth/type_auth';
import { LoginRequest, RegisterRequest, getUserLocalStorage, setUserLocalStorage } from '../auth/Utils';

export function AuthProvider({
    children
}: IAuthProvider){
    const navigate = useNavigate()
    const [user, setUser] = useState<IUser | null>()

    async function Register(formData: FormData){
        // main function's auth REGISTER system
        try {
            const response = await RegisterRequest(formData)
            console.log(`%c SYSTEM %c ${response.data} `, 
                'background: #C4473A; color: #f0eff5; font-weight: bold;',
                'background: #f0f8ff; color: #111111; font-weight: bold;'
            );
            
        } catch (error) {
            console.error(error)
        }
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