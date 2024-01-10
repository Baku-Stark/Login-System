import { useEffect, useState } from "react"
import { useAuth } from "../context/useAuth"

import { IUser } from "../auth/type_auth"
import { getUserLocalStorage } from "../auth/Utils"

export function Home(){
    const auth = useAuth()

    const [account, setAccount] = useState<IUser | null>()

    function Logout(){
        auth.Logout()
    }

    useEffect(() => {
        const user = getUserLocalStorage()

        if(user){
            setAccount(user)
        }
    }, [])
    
    return(
        <div>
            <h1>Home Page!</h1>
            <p>
                {account?.email}
            </p>
            <p>
                {account?.token}
            </p>
            <button onClick={Logout}>Logout</button>
        </div>
    )
}