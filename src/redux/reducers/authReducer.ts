import { stopSubmit, SubmissionError } from 'redux-form'
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'react';
import { StateType } from '../redux';
import AuthService, { UserDataType } from '../../api/Services/AuthService';

const SET_USER = "App/authReducer/SET_USER";
const SET_USER_IMAGE = "App/authReducer/SET_USER_IMAGE";
const USER_LOGOUT = "App/authReducer/USER_LOGOUT";

export type InitUserState = {
    userId: string | null,
    username: string | null,
    image: string | null,
    email: string | null,
    date: Date | null
}

let initState = {
    user: {
        userId:null,
        username:null,
        image: null,
        email:null,
        date: null,
    } as InitUserState,
    isAuth:false as boolean
};

export type InitState = typeof initState;

const authReducer = (state:InitState = initState,action: ActionType): InitState => {
    switch(action.type) {
        case SET_USER:
        return {...state, user: {...action.data}, isAuth: true}
        case SET_USER_IMAGE:
        return {...state, user: {...state.user}, isAuth: true}
        case USER_LOGOUT:
        return {...state, isAuth: false}
    }

    return state;
}

export type ActionType = SetUserType | SetUserImageType | SetUserLogout;

export type UserType = {
    userId:string,
    username:string,
    image: string | null,
    email:string,
    date: Date
}

export type SetUserType = {
    type: typeof SET_USER,
    data: UserType
}

export const setUser = (data: UserType):SetUserType => { return { type: SET_USER,data: data} }

type SetUserImageType = {
    type: typeof SET_USER_IMAGE,
    image: string
}

export const setUserImage = (image: string):SetUserImageType => { return {type: SET_USER_IMAGE, image} }


export type SetUserLogout = {
    type: typeof USER_LOGOUT,
}

export const setUserLogout = ():SetUserLogout => { return { type: USER_LOGOUT} }


export interface AuthType  {
    email: string,
    password: string
}

export interface RegisterType extends AuthType {
    username: string
}
/*
export type UserImageType = {
    image: string | null
}*/

const saveUser = (userData: UserDataType, dispatch: Dispatch<ActionType>) => {
    let {_id,username, image,email,date} = userData;
    dispatch(setUser({userId: _id,username, image,email,date: date}));
}

const setToken = (token: string) => {
    localStorage.setItem("token",token);
}

export const authThunkCreator = (data :AuthType) : ThunkAction<Promise<void>,StateType, unknown,ActionType & any> => async (dispatch, getState) => {
    try{
        const userData = await AuthService.autorization(data);
        setToken(userData.access);
        saveUser(userData.user, dispatch);
    } catch(e) {
        dispatch(stopSubmit("auth",{_error : e.message} ));
    }
}

export const registerThunkCreator = (data :RegisterType) : ThunkAction<Promise<void>,StateType, unknown,ActionType & any> => async (dispatch, getState) => {
    try{
        const userData = await AuthService.registration(data);
        setToken(userData.access);
        saveUser(userData.user, dispatch);
    } catch(e) {
        dispatch(stopSubmit("register",{_error : e.message} ));
    }
}

export const check = (): ThunkAction<Promise<void>,StateType, unknown,ActionType> => async (dispatch) => {
    try{
        const check = await AuthService.refrash();
        setToken(check.access);
        saveUser(check.user, dispatch);
    } catch(e) {
        console.log("Some error")
    }
}

export const changeUserImage = (image: any): ThunkAction<Promise<void>,StateType, unknown,ActionType> => async (dispatch) => {
    try {
        const userData = await AuthService.imageUpload(image);
        saveUser(userData, dispatch);
    } catch (e) {
        throw new Error("Change error");
    }
}

export const logout = (): ThunkAction<Promise<void>,StateType, unknown,ActionType> => async (dispatch) => {
    try {
        await AuthService.logout();
        localStorage.removeItem("token");
        dispatch(setUserLogout());
        console.log("LOGOUT");
    } catch (e) {
        throw new Error();
    }
}

export default authReducer;