import React from 'react';
import AuthNav from '../AuthNav/AuthNav';
import AuthRoutes from '../AuthRoutes/AuthRoutes';

const AuthWindow: React.FC = () => {
    return (
        <div className="authon">
            <AuthNav />
            <AuthRoutes/>
        </div>
    )
}

export default AuthWindow;