import { Api } from "../services/API_Auth/API"
import { IUser } from "./type_auth"

export async function LoginRequest(email: string, password: string){
    // console.log(`${email} - ${password}`)
    try{
        const request = await Api.post('login', {email, password})
        // console.log(`TOKEN: ${request.data.token}`)
        
        return request.data
    }
    catch (error){
        return null
    }
}

export function getUserLocalStorage(){
    const json = localStorage.getItem('u')
    if(!json){
        return null
    }

    const user = JSON.parse(json)
    return user ?? null
}

export function setUserLocalStorage(user: IUser | null){
    localStorage.setItem('u', JSON.stringify(user))
}