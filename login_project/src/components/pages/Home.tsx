import { useAuth } from "../context/useAuth"

export function Home(){
    const auth = useAuth()

    function Logout(){
        auth.Logout()
    }
    
    return(
        <div>
            <h1>Home Page!</h1>
            <button onClick={Logout}>Logout</button>
        </div>
    )
}