import { ThunkAction } from "redux-thunk";
import { UserDataType } from "../../api/Services/AuthService";
import UsersService from "../../api/Services/UsersService";
import { StateType } from "../redux";

const SET_SEARCHED_USERS =  "App/usersReducer/SET_SEARCHED_USERS";

const initState = {
    searchedUsers: [] as Array<UserDataType>
}

type InitState = typeof initState;

export const usersReducer = (state: InitState = initState, action: ActionType) => {
    switch(action.type) {
        case SET_SEARCHED_USERS:
        return {...state, searchedUsers: [...action.users]}
    }

    return state;
}


type ActionType = SetSearchedUsersType;

type SetSearchedUsersType = {
    type: typeof SET_SEARCHED_USERS,
    users: Array<UserDataType>
}

export const setSearchedUsers = (users: Array<UserDataType>): SetSearchedUsersType => {
    return {
        type: SET_SEARCHED_USERS,
        users
    }
}

export const searchUser = (username: string): ThunkAction<Promise<void>,StateType, unknown,ActionType & any> => async (dispatch) => {
    try {
        const users = await UsersService.search(username);
        dispatch(setSearchedUsers(users));
    } catch(e) {
        console.log(e.message);
    }
}