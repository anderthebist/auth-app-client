import React from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import { SubmissionError} from 'redux-form';
import { authThunkCreator, AuthType, registerThunkCreator, RegisterType } from '../../redux/reducers/authReducer';
import AuthForm from "../forms/AuthForm";
import RegisterForm from '../forms/RegisterForm';

const AuthRoutes = () => {
    const dispatch = useDispatch();

    const validateEmail = (email: string): boolean => {
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
    }

    const susbmitError = (textError: string): void => {
        throw new SubmissionError({
            _error: textError
        })
    }
    
    const validEmailPasword = (values: AuthType): void => {
        if(!values.email) susbmitError('Введите email');
        if(!validateEmail(values.email)) susbmitError('Не корректный email');

        if(!values.password) susbmitError('Введите пароль');
        if(values.password.trim().length < 8 || values.password.trim().length > 15) 
            susbmitError('Пароль должно содержаться не менее 8 и не более 15 символов');
    }

    const register = (values: RegisterType): void => {
        if(!values.username) susbmitError('Введите имя');
        if(values.username.trim().length < 4 || values.username.trim().length > 12)  
            susbmitError('Имя должно содержаться не менее 4 и не более 12 символов');
        validEmailPasword(values);
        dispatch(registerThunkCreator(values));
    }

    const auth = (values: AuthType) => {
        validEmailPasword(values);
        dispatch(authThunkCreator(values));
    }

    return (
        <div className = "authon_body">
            <Switch>
                <Route path = "/auth">
                    <AuthForm onSubmit = {auth}/>
                </Route>
                <Route path = "/register">
                    <RegisterForm onSubmit = {register} />
                </Route>
            </Switch>
        </div>
    );
}

export default AuthRoutes;