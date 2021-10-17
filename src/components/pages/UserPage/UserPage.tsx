import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { changeUserImage, logout, InitUserState } from '../../../redux/reducers/authReducer';
import { getPosts } from '../../../redux/reducers/postsReducer';
import { getProfile } from '../../../redux/reducers/profileReducer';
import { StateType } from '../../../redux/redux';
import PostBlock from '../../PostBlock/PostBlock';
import SearchUsers from '../../SearchUsers/SearchUsers';
import UserImage from '../../UserImage/UserImage';
import UserInfo from '../../UserInfo/UserInfo';

const UserPage: React.FC = () => {
    const dispatch = useDispatch();
    const {user,isAuth,profile} = useSelector((state: StateType) => { 
        return { 
            user: state.auth.user,
            isAuth: state.auth.isAuth,
            profile: state.profile.profile
        } 
    });
    const params: any = useParams();
    const username = params.username;

    let person = username ? profile : user;
    const isOwnPage = !username && isAuth;

    useEffect(() => {
        if(username && !isOwnPage) {
            dispatch(getProfile(username));
        }
    }, [username]);

    if(!username && !isAuth) return <Redirect to = "/auth" />;

    const logoutDispatch = () => dispatch(logout());
    const changeImage = (image: any) => dispatch(changeUserImage(image))

    if(!person) return <></>;

    return (
        <>
        <SearchUsers />
        <div className = "container">
            <div className="user_block">
                <UserImage changeUserImage = {changeImage} image = {person.image} isOwn = {isOwnPage} />
                <UserInfo isOwn = {isOwnPage} username = {person.username} date = {person.date} logout = {logoutDispatch} />
            </div>
            <PostBlock user = {person} isOwn = {isOwnPage} />
        </div>
        </>
    );
}

export default UserPage;