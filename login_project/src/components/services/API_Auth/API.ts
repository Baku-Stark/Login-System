import axios from 'axios'

import { getUserLocalStorage } from '../../auth/Utils'

export const Api = axios.create({
    baseURL: "API LINK"
})

Api.interceptors.request.use(
    (config) => {
        const user = getUserLocalStorage()
        config.headers.Authorization = user?.token
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)