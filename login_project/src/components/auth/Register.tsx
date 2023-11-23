import { Link, useNavigate } from "react-router-dom"

import { useState } from "react"
import { IUser } from "./type_auth"
import { useAuth } from "../context/useAuth"

import styles from '../../assets/CSS/auth.module.css'

export function Register(){
    const auth = useAuth()
    const navigate = useNavigate()

    const [file, setFile] = useState('')
    const [account, setAccount] = useState<IUser | null>()


    function handleChangeImage(e:any){
        setFile(e.target.files[0])
    }

    function handleChange(e:any){
        //console.log(e.target.files)
        setAccount({...account, [e.target.name]: e.target.value})
    }

    async function submitRegister(e:any){
        e.preventDefault()

        if(account?.password == account?.con_password){
            e.target.reset()

            const formData = new FormData()

            formData.append('user', account?.user as string)
            formData.append('email', account?.email as string)
            formData.append('password', account?.password as string)
            formData.append('file', file)

            await auth.Register(formData)
            navigate('/sign_in/')
        }

        else{
            console.error("Error")
        }
    }

    return(
        <div className={styles.section}>
            <div className={styles.container_auth}>
                <form method="POST" onSubmit={submitRegister}>
                    <div className={styles.divider_form}>
                        <input
                            required
                            type="text"
                            name="user"
                            maxLength={45}
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
                    <div className={styles.divider_form}>
                        <input
                            type="file"
                            name="file"
                            placeholder="Send a picture"
                            onChange={handleChangeImage}
                        />
                    </div>
                    <div className={styles.divider_link_form}>
                        <Link to={"/sign_in/"}>Log in to your account</Link>
                    </div>
                    <div className={styles.divider_form}>
                        <input type="submit" value="Sign Up" />
                    </div>
                </form>
            </div>
        </div>
    )
}