import { ThunkAction } from "redux-thunk";
import { StateType } from "../redux";
import { check } from "./authReducer";

const SET_LOADING = "App/authReducer/SET_LOADING";

let initState = {
    isLoading: false as boolean
}

type InitState = typeof initState;

export const appReducer = (state = initState,action: ActionType): InitState => {
    switch(action.type) {
        case SET_LOADING:
        return {...state, isLoading: action.value}
    }

    return state;
}

export type ActionType = SetLoadingType;

type SetLoadingType = {
    type: typeof SET_LOADING,
    value: boolean
}

export const setLoading = (value: boolean): SetLoadingType => {
    return {
        type: SET_LOADING,
        value
    }
}

export const loading = (): ThunkAction<Promise<void>,StateType, unknown,ActionType> => async (dispatch) => {
    try {
        const all = await Promise.all([dispatch(check())]);
        dispatch(setLoading(true));
    } catch(e) {
        dispatch(setLoading(true));
        console.log("User auth")
    }
}