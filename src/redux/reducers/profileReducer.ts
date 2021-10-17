import { ThunkAction } from "redux-thunk";
import { UserDataType } from "../../api/Services/AuthService";
import UsersService from "../../api/Services/UsersService";
import { StateType } from "../redux";

const SET_PROFILE = "App/profileReducer/SET_PROFILE";

const initState = {
    profile: null as UserDataType | null
}

type InitState = typeof initState;

export const profileReducer = (state: InitState = initState, action: ActionType) => {
    switch(action.type) {
        case SET_PROFILE:
        return {...state, profile: action.profile}
    }

    return state;
}

type ActionType = SetProfile;

type SetProfile = {
    type: typeof SET_PROFILE,
    profile: UserDataType
}

const setProfile = (profile: UserDataType): SetProfile => {
    return {
        type: SET_PROFILE,
        profile
    }
}

export const getProfile = (username: string): ThunkAction<Promise<void>,StateType, unknown,ActionType & any> => async (dispatch) => {
    try {
        const profile = await UsersService.search(username);
        if(profile.length)
            dispatch(setProfile(profile[0]));
    } catch (e) {
        throw new Error(e.message);
    }
}