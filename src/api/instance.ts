import axios from 'axios';
import { AuthResponseType } from './Services/AuthService';

export const BASE_URL = "http://localhost:7000/api";

const instance = axios.create({
    withCredentials:true,
    baseURL: BASE_URL
    //headers:{}
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
})

instance.interceptors.response.use((config) => config, async (error) => {
    const original = error.config;
    if(error.response.status == 401 && error.config && !error.config._isRetry) {
        original._isRetry = true;
        try {
            const response = await axios.get<AuthResponseType>(`${BASE_URL}/refresh`, {withCredentials: true});
            localStorage.setItem("token", response.data.access);
            return instance.request(original);
        } catch(e) {
            console.log("Не авторизован");
        }
    }

    return error;
})

export default instance;