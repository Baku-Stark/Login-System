import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { IUser } from "./type_auth"
import { useAuth } from "../context/useAuth"

import styles from '../../assets/CSS/auth.module.css'

export function Login(){
    const navigate = useNavigate()
    const auth = useAuth()

    const [account, setAccount] = useState<IUser | null>()

    function handleChange(e:any){
        setAccount({...account, [e.target.name]: e.target.value})
    }

    async function submitLogin(e:any){
        // console.log(account)
        e.preventDefault()
        e.target.reset()
        
        await auth.Authenticate(account?.email as string, account?.password as string)
        navigate('/')
    }

    return(
        <div className={styles.section}>
            <div className={styles.container_auth}>
                <form method="POST" onSubmit={submitLogin}>
                    <div className={styles.divider_form}>
                        <input
                            required
                            type="text"
                            name="email"
                            placeholder="Type your username ou email"
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
        </div>
    )
}