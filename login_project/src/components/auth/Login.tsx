import { useState } from "react"
import { IUser } from "./type_auth"

import styles from '../../assets/CSS/auth.module.css'
import { useAuth } from "../context/useAuth"
import { Link } from "react-router-dom"

export function Login(){
    const auth = useAuth()

    const [account, setAccount] = useState<IUser | null>()

    function handleChange(e:any){
        setAccount({...account, [e.target.name]: e.target.value})
    }

    function submitLogin(e:any){
        e.preventDefault()
        console.log(account)
        auth.Authenticate(account?.user as string, account?.password as string)
        e.target.reset()
        // navigate('/sign_in/')
    }

    return(
        <div>
            <form method="POST" onSubmit={submitLogin}>
                <div className={styles.divider_form}>
                    <input
                        required
                        type="text"
                        name="user"
                        placeholder="Type your username"
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.divider_form}>
                    <input
                        required
                        type="password"
                        name="password"
                        placeholder="Type your password"
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.divider_link_form}>
                    <Link to={"/sign_up/"}>Create a account</Link>
                </div>
                <div className={styles.divider_form}>
                    <input type="submit" value="Entrar" />
                </div>
            </form>
        </div>
    )
}