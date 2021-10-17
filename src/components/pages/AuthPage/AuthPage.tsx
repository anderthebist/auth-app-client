import React, { FC } from 'react';
import {Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StateType } from '../../../redux/redux';
import "./AuthPage-module.scss";
import AuthWindow from '../../AuthWindow/AuthWindow';

const AuthPage: FC = () => {
    const isAuth = useSelector((state: StateType) => state.auth.isAuth);   

    if(isAuth){ 
        return (<Redirect to = "/" />);
    }

    return (
        <div className = "form_block">
            <AuthWindow />
        </div>
    );
}

export default AuthPage;