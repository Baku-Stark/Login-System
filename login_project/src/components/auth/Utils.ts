import { Api } from "../services/API_Auth/API"
import { IUser } from "./type_auth"

export async function LoginRequest(formData: FormData){
    try{
        const request = await Api.post('sign_in', formData)
        //console.log(`TOKEN(Utils): ${request.data.token}`)
        
        return request.data
    }
    catch (error){
        return null
    }
}

export async function RegisterRequest(formData: FormData){
    try{
        const request = await Api.post('sign_up', formData)

        return request.data
    }
    catch(error){
        return null
    }
}

export async function UserRequest(formData: FormData){
    try{
        const request = await Api.post('auth_user', formData)

        return request.data
    }
    catch(error){
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