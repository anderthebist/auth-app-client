import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { searchUser, setSearchedUsers } from '../../redux/reducers/usersReducer';
import { StateType } from '../../redux/redux';
import SearchField from './SearchField/SearchField';
import "./SearchUsers-module.scss";

const SearchUsers: React.FC = () => {
    const dispatch = useDispatch();
    const searchedUsers = useSelector((state: StateType) => state.users.searchedUsers);
    const history = useHistory();

    const searchRealTime = (text: string) => {
        if(text.length <= 2){
            dispatch(setSearchedUsers([]));
            return;
        }
        dispatch(searchUser(text));
    }

    const searchItemClick = (item) => {
        history.push(`/${item.username}`);
        dispatch(setSearchedUsers([]));
    }

    return (
        <div className="search__users">
            <div className="search__users__container">
                <SearchField onChangeSearch = {searchRealTime} onItemClick = {searchItemClick}>
                    {
                        searchedUsers.map((elem) => 
                            <div className="search__users__recomended__item" onClick = {() => searchItemClick(elem)}>
                                <img src={`http://localhost:7000/${elem.image || "user.png"}`} alt="" />
                                <h4>{elem.username}</h4>
                            </div>   
                        )
                    }
                </SearchField>
            </div>
        </div>
    );
}

export default SearchUsers;