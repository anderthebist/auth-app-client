import React from "react";
import { NavLink } from "react-router-dom";

const AuthNav: React.FC = () => {
    return (
        <div className = "navigation">
            <NavLink to="/auth" activeClassName="active">
                <div className = "navigation_item">
                    Авторизация
                </div>
            </NavLink>
            <NavLink to="/register" activeClassName="active">
                <div className = "navigation_item">
                    Регистрация
                </div>
            </NavLink>
        </div>
    );
}

export default AuthNav;