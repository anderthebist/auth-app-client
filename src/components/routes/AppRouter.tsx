import React from 'react';
import {Switch,Route} from 'react-router-dom';
import UserPage from '../pages/UserPage/UserPage';
import AuthPage from '../pages/AuthPage/AuthPage';

const AppRouter = () => {
    return (
        <Switch>
            <Route path = {["/auth", "/register"]} exact>
                <AuthPage />
            </Route>
            <Route path = "/:username?" >
                <UserPage />
            </Route>
      </Switch>
    );
}

export default AppRouter;