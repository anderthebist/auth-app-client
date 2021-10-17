import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { StateType } from '../redux/redux';
import { IsAuthType } from '../utils/types';

type WithAuthType<T> = <T,>(Component: React.ComponentType< T>) => React.ComponentType;

const withAuth = (Component: React.ComponentType<any>) => {

    const WithAuthComponent: React.FC<IsAuthType> = ({isAuth}) => {
        if(!isAuth) return (<Redirect to = "/" />);

        return(
            <Component isAuth = {isAuth} />
        )
    }

    const mapStateToAuth = (state: StateType): IsAuthType => { return { isAuth: state.auth.isAuth } }
    return connect(mapStateToAuth,{})(WithAuthComponent);
}

export default withAuth;