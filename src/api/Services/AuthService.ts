import axios, { AxiosResponse } from 'axios';
import { AuthType, RegisterType } from '../../redux/reducers/authReducer';
import instance, { BASE_URL } from '../instance';

export type UserDataType = {
    _id:string,
    username:string,
    image: string | null,
    email:string,
    date: Date,
}

export type AuthResponseType = {
    access: string,
    refrash: string,
    user: UserDataType
} 

class AuthService {
    PREFIX_AUTH = "/auth";

    async autorization(data: AuthType): Promise<AuthResponseType>{
        let {email,password} = data;
        const user = await instance.post<AuthResponseType>(`${this.PREFIX_AUTH}/login`,{email,password});
        return user.data;
    }

    async registration(data: RegisterType): Promise<AuthResponseType>{
        let {username, email, password} = data;
        const user = await instance.post<AuthResponseType>(`${this.PREFIX_AUTH}/registration`, {username, email, password});
        return user.data;
    }

    async refrash(): Promise<AuthResponseType> {
        const refrash = await axios.get<AuthResponseType>(BASE_URL + `${this.PREFIX_AUTH}/refrash`,{ withCredentials: true });
        return refrash.data;
    }

    async imageUpload(image: any): Promise<UserDataType> {
        const formData = new FormData();
        formData.append("image",image);

        const user = await instance.post<UserDataType>(`${this.PREFIX_AUTH}/fileupload`, formData, {headers:{"Content-Type" : "multipart/form-data" }});
        return user.data; 
    }

    async logout() {
        await instance.post(`${this.PREFIX_AUTH}/logout`);
    }
}

export default new AuthService();