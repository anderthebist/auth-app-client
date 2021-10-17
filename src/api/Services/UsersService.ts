import axios, { AxiosResponse } from 'axios';
import { AuthType, RegisterType } from '../../redux/reducers/authReducer';
import instance, { BASE_URL } from '../instance';
import { UserDataType } from './AuthService';


class UsersService {
    PREFIX_USERS = "/users";

    async search(username) { 
        const users = await instance.get<Array<UserDataType>>(`${this.PREFIX_USERS}/search/${username}`);
        return users.data;
    }
}

export default new UsersService();