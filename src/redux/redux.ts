import { applyMiddleware, combineReducers, createStore } from "redux";
import { reducer as formReducer } from 'redux-form';
import authReducer from "./reducers/authReducer";
import thunkMiddleware from 'redux-thunk';
import { appReducer } from "./reducers/appReducer";
import { postsReducer } from "./reducers/postsReducer";
import { usersReducer } from "./reducers/usersReducer";
import { profileReducer } from "./reducers/profileReducer";

const rootReducer = combineReducers({
    form: formReducer,
    app: appReducer,
    auth: authReducer,
    posts: postsReducer,
    users: usersReducer,
    profile: profileReducer
});

export type ReducerType = typeof rootReducer;
export type StateType = ReturnType<ReducerType>;

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;