import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { AuthContext } from './AuthContext';
import { IAuthProvider, IUser } from '../auth/type_auth';
import { LoginRequest, RegisterRequest, UserRequest, getUserLocalStorage, setUserLocalStorage } from '../auth/Utils';

export function AuthProvider({
    children
}: IAuthProvider){
    const navigate = useNavigate()
    const [user, setUser] = useState<IUser | null>()

    async function Register(formData: FormData){
        // main function's auth REGISTER system
        try {
            const response = await RegisterRequest(formData)

            if(response == null){
                console.warn(`%c SYSTEM [Register - Error] %c OPS! Your Response: ${response} `, 
                    'background: #C4473A; color: #f0eff5; font-weight: bold;',
                    'background: #f0f8ff; color: #111111; font-weight: bold;'
                );
            }
            
            else{
                console.log(`%c SYSTEM [Register - Success] %c ${response.token} `, 
                    'background: #C4473A; color: #f0eff5; font-weight: bold;',
                    'background: #f0f8ff; color: #111111; font-weight: bold;'
                );

                navigate('/sign_in/')
            }
            
        } catch (error) {

            console.error(`%c SYSTEM [Register - Error] %c ${error} `, 
                'background: #C4473A; color: #f0eff5; font-weight: bold;',
                'background: #f0f8ff; color: #111111; font-weight: bold;'
            );

            console.error(error)
        }
    }

    async function Login(formData: FormData){
        // main function's auth LOGIN system
        try {
            const response = await LoginRequest(formData)
            //console.log(response)

            const payload = {token: response.token, email: response.email}

            setUser(payload)
            setUserLocalStorage(payload)

            if(response == null){
                    console.warn(`%c SYSTEM [Login - Error] %c OPS! Your Response: ${response} `, 
                    'background: #C4473A; color: #f0eff5; font-weight: bold;',
                    'background: #f0f8ff; color: #111111; font-weight: bold;'
                );
            }
            else{
                console.log(`%c SYSTEM [Login - Success] %c ${response.token} `, 
                    'background: #C4473A; color: #f0eff5; font-weight: bold;',
                    'background: #f0f8ff; color: #111111; font-weight: bold;'
                );
                navigate('/')
            }

        } catch (error) {

            console.error(`%c SYSTEM [Login - Error] %c ${error} `, 
                'background: #C4473A; color: #f0eff5; font-weight: bold;',
                'background: #f0f8ff; color: #111111; font-weight: bold;'
            );

            console.error(error)
        }
    }

    async function UserGet(token: string){
        const formData = new FormData()

        formData.append('token', token as string)

        const response = await UserRequest(formData)
        console.log(response)
    }

    async function Authenticate(
        email: string,
        password: string
    ){
        // main function's auth login system
        const formData = new FormData()
        formData.append('email', email as string)
        formData.append('password', password as string)

        const response = await LoginRequest(formData)
        // console.log(response)

        const payload = {token: response.token, email}

        setUser(payload)
        setUserLocalStorage(payload)
        navigate('/')
    }

    function Logout(){
        setUser(null)
        setUserLocalStorage(null)
        navigate('/sign_in/')
    }

    useEffect(() => {
        const user = getUserLocalStorage()

        if(user){
            setUser(user)
            navigate('/')
        }
    }, [])

    return(
        <AuthContext.Provider value={{...user, Authenticate, Login,Register, UserGet, Logout}}>
            {children}
        </AuthContext.Provider>
    )
}