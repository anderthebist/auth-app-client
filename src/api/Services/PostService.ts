import { type } from "os";
import instance from "../instance";

export type PostResponseType = {
    _id: string,
    user: string,
    text: string,
    date: Date
}

class PostService {
    async getPosts(userId: string) {
        const posts = await instance.get<Array<PostResponseType>>(`/posts/${userId}`);
        return posts.data;
    }

    async addPost(text: string) {
        const newPost = await instance.post<PostResponseType>(`/posts/create`, { text });
        return newPost.data;
    }

    async deletePost(postId: string) {
        const deleted = await instance.delete(`/posts/${postId}`);
        return deleted;
    }
}

export default new PostService();