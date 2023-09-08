import { Link, useNavigate } from "react-router-dom"

import { useState } from "react"
import { IUser } from "./type_auth"
import { useAuth } from "../context/useAuth"

import styles from '../../assets/CSS/auth.module.css'

export function Register(){
    const auth = useAuth()
    const navigate = useNavigate()

    const [account, setAccount] = useState<IUser | null>()

    function handleChange(e:any){
        setAccount({...account, [e.target.name]: e.target.value})
    }

    function submitRegister(e:any){
        e.preventDefault()
        if(account?.password == account?.con_password){
            console.log(account)
            auth.Authenticate(account?.user as string, account?.password as string)
            e.target.reset()
            navigate('/sign_in/')
        }

        else{
            console.error("Error")
        }
    }

    return(
        <div>
            <form method="POST" onSubmit={submitRegister}>
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
                        type="email"
                        name="email"
                        placeholder="Type your email address"
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
                <div className={styles.divider_form}>
                    <input
                        required
                        type="password"
                        name="con_password"
                        placeholder="Confirm your password"
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.divider_link_form}>
                    <Link to={"/sign_in/"}>Enter in your account</Link>
                </div>
                <div className={styles.divider_form}>
                    <input type="submit" value="Entrar" />
                </div>
            </form>
        </div>
    )
}