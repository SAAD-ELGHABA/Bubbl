import axios from 'axios'


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5173/",
    headers:{
        "Content-Type" : "application/json"
    }
})


export const authRegister = async (payload) =>{
    const response = await api.post('/user/register',payload)
    return response
}
export const authLogin = async (payload) =>{
    const response = await api.post('/user/login',payload)
    return response
}
export const getUserConnected = async (id) =>{
    const response = await api.get(`/user/user/${id}`)
    return response
}


