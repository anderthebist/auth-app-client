import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { PostResponseType } from "../../api/Services/PostService";
import { InitUserState } from "../../redux/reducers/authReducer";
import { addPost, deletePost, getPosts } from "../../redux/reducers/postsReducer";
import { StateType } from "../../redux/redux";
import Post from "../Post/Post";
import Poster from "../Poster/Poster";
import "./PostBlock-module.scss";

type OwnProps = {
    user: InitUserState,
    isOwn: boolean
}

const PostBlock: React.FC<OwnProps> = ({user, isOwn}) => {
    const dispatch = useDispatch();
    const posts = useSelector((state: StateType) => state.posts.posts)

    useEffect(() => {
        if(user.userId)
        dispatch(getPosts(user.userId));
    },[])

    const createPost = (text: string) => dispatch(addPost(text));
    const delPost = (id: string) => dispatch(deletePost(id))

    return (
        <div className="post_block">
            { isOwn && <Poster add = {createPost} /> }
            <div>
                { posts.map((elem,i) => <Post key = {i} user = { user } post = { elem } deletePost = {delPost} />) }
            </div>
        </div>
    );
}

export default PostBlock;