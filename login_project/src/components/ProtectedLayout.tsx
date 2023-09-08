import { Link } from "react-router-dom"
import { useAuth } from "./context/useAuth"

export function ProtectedLayout({
    children
}: {children: JSX.Element}){
    const user = useAuth()

    if(!user.email){
        return (
            <>
                <h1>You don't have access!</h1>
                <Link to={"/sign_in/"}>Login</Link>
            </>
        )
    }
    return children
}