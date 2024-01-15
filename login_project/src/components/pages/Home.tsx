import { useEffect, useState } from "react"
import { useAuth } from "../context/useAuth"

// import { IUser } from "../auth/type_auth"
import { getUserLocalStorage, UserRequest } from "../auth/Utils"

import styles from '../../assets/CSS/auth.module.css'

export function Home(){
    const auth = useAuth()

    const [account, setAccount] = useState([])

    function Logout(){
        auth.Logout()
    }

    useEffect(() => {
        const user_token = getUserLocalStorage()
        // console.log(`Home Page: ${user_token.token}`)

        async function UserRequestApi(user_token: string){
            try {
                const formData = new FormData()
                formData.append('token', user_token as string)

                const response = await UserRequest(formData)

                // console.log(`Home Page:`)
                // console.log(response.data)
                
                setAccount(response.data)
            }
            catch (error) {
                console.error(`%c SYSTEM [Register - Error] %c OPS! Your Response: ${error} `, 
                    'background: #C4473A; color: #f0eff5; font-weight: bold;',
                    'background: #f0f8ff; color: #111111; font-weight: bold;'
                );
            }
            
        }

        if(user_token.token){
            UserRequestApi(user_token.token)
        }
    }, [])
    
    return(
        <div className={styles.container_profile}>
            <h1>Home Page!</h1>

            <div className={styles.container_info}>
                <div>
                    <img
                        src={`http://localhost:8000/vector_image/get_image/${account[2]}/${account[4]}`}
                        alt="ICON PROFILE"
                        className={styles.icon}
                    > 
                    </img>
                </div>
                <ul>
                    <li>
                        <strong>ID</strong>: <p>{account[0]}</p>
                    </li>
                    <li>
                        <strong>User</strong>: <p>{account[2]}</p>
                    </li>
                    <li>
                        <strong>Email</strong>: <p>{account[3]}</p>
                    </li>
                    <li>
                        <strong>Token</strong>: <p>{account[1]}</p>
                    </li>
                </ul>
            </div>
            
            <button onClick={Logout}>Logout</button>
        </div>
    )
}