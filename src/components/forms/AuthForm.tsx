import React, { FC } from 'react';
import { reduxForm,Field,InjectedFormProps } from 'redux-form';
import { AuthType } from '../../redux/reducers/authReducer';
import { PreloaderSize } from '../../utils/enums';
import Preloader from '../Preloader/Preloader';

type AuthFormOwnProps = {
    isFetching: boolean
}

const AuthForm: FC<InjectedFormProps<AuthType>> = ({handleSubmit, pristine,submitting,error}) => {
    return (
        <form action="" onSubmit = {handleSubmit} id = "login">
            <h3 className = "auth_title">Авторизация</h3>
            {error && <div className = "error">{error}</div>}
            <Field component = "input" className = "input_field" name = "email" placeholder = "Email" type = "email" />
            <Field component = "input" className = "input_field" name = "password" placeholder = "Pasword" type = "password" />
            <button type = "submit" className = "field-btn" disabled = { submitting}>Войти</button>
        </form>
    );
}

export default reduxForm<AuthType>({form: 'auth'})(AuthForm);