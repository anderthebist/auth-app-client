import React from 'react';
import { InjectedFormProps, reduxForm, Field } from 'redux-form';
import { RegisterType } from '../../redux/reducers/authReducer';

const RegisterForm : React.FC<InjectedFormProps<RegisterType>> = (props) => {
    return (
        <form action="" onSubmit = {props.handleSubmit} id = "register">
            <h3 className = "auth_title">Регистрация</h3>
            {props.error && <div className = "error">{props.error}</div>}
            <Field component = "input" className = "input_field" name = "username" placeholder = "Username" type = "text" />
            <Field component = "input" className = "input_field" name = "email" placeholder = "Email" type = "email" />
            <Field component = "input" className = "input_field" name = "password" placeholder = "Pasword" type = "password" />
            <button className = "field-btn">Зарегистрироваться</button>
        </form>
    );
}

export default reduxForm<RegisterType>({form: 'register'})(RegisterForm);