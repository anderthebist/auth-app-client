import { ThunkAction } from "redux-thunk";
import PostService, { PostResponseType } from "../../api/Services/PostService";
import { StateType } from "../redux";

const ADD_POSTS = "App/authReducer/ADD_POST";
const SET_POSTS = "App/authReducer/SET_POSTS";
const CLEAR_POSTS = "App/authReducer/CLEAR_POSTS";
const REMOVE_POST = "App/authReducer/REMOVE_POST";
/*
export type PostType = {
    id: string,
    text: string,
    date: Date
}*/

const initState = {
    posts: [] as Array<PostResponseType>
}

type InitState = typeof initState;

export const postsReducer = (state: InitState = initState, action: ActionType) => {
    switch(action.type) {
        case ADD_POSTS: 
        return {...state, posts: [...action.posts,...state.posts]}
        case SET_POSTS:
        return {...state,posts: action.posts}
        case REMOVE_POST:
        return {...state, posts: state.posts.filter(elem => (elem._id != action.postId))}
        case CLEAR_POSTS:
        return {...state, posts: []}
    }

    return state;
}

type ActionType = AddPostType | ClearPostsType | SetPostType | RemovePostType;

type AddPostType = {
    type: typeof ADD_POSTS, 
    posts: Array<PostResponseType>
}
export const addPosts = (posts: Array<PostResponseType>): AddPostType => { return { type: ADD_POSTS, posts } }

type SetPostType = {
    type: typeof SET_POSTS, 
    posts: Array<PostResponseType>
}
export const setPosts = (posts: Array<PostResponseType>): SetPostType => { return { type: SET_POSTS, posts } }

type ClearPostsType = {
    type: typeof CLEAR_POSTS
}
export const clearPosts =  (): ClearPostsType => { return { type: CLEAR_POSTS }}

type RemovePostType = {
    type: typeof REMOVE_POST,
    postId: string
}

export const removePost = (postId: string): RemovePostType => { return { type: REMOVE_POST,postId } }

export const getPosts = (userId: string): ThunkAction<Promise<void>,StateType, unknown,ActionType> => async (dispatch) => {
    try {
        const posts = await PostService.getPosts(userId);
        dispatch(setPosts(posts));
    } catch (e) {
        throw new Error(e.message);
    }
}

export const addPost = (text: string): ThunkAction<Promise<void>,StateType, unknown,ActionType> => async (dispatch) => {
    try {
        const post = await PostService.addPost(text);
        dispatch(addPosts([post]));
    } catch (e) {
        throw new Error(e.message);
    }
}

export const deletePost = (postId: string): ThunkAction<Promise<void>,StateType, unknown,ActionType> => async (dispatch) => {
    try {
        const del = await PostService.deletePost(postId);
        console.log(del);
        dispatch(removePost(postId));
    } catch(e) {
        throw new Error(e.message);
    }
}

