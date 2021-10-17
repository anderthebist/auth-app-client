import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { PostResponseType } from "../../api/Services/PostService";
import { InitUserState } from "../../redux/reducers/authReducer";
import { PreloaderSize } from "../../utils/enums";
import Preloader from "../Preloader/Preloader";
import "./Post-module.scss";

type OwnProps = {
    user: InitUserState,
    post: PostResponseType,
    deletePost: (postId: string) => void
}


const Post: React.FC<OwnProps> = ({ user,post,deletePost }) => {
    const ref = useRef<any>();
    const [isMenuOpen,setMenu] = useState<boolean>(false);
    const [isFetch, setFetch] = useState<boolean>(false);

    useEffect(() => {
        const checkIfClickedOutside = (e: MouseEvent) => {
          if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
            setMenu(false)
          }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
          document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [isMenuOpen])

    const del = async () => {
        try {
            setFetch(true);
            await deletePost(post._id);
            setFetch(false);
            setMenu(false);
        } catch(e) {
            setFetch(false);
            setMenu(false);
        }
    }

    if(isFetch) return <Preloader size = {PreloaderSize.Middle} />

    return (
        <div className = "post_item" data-id = {post._id}>
            <div className="post_user">
                <div className = "post_user_content">
                    <div className="post_user_image">
                        <img src = { `http://localhost:7000/${user.image || "user.png"}` } alt="" />
                    </div>
                    <div className="post_user_info">
                        <h4 className = "post_username">{ user.username }</h4>
                        <span className = "post_date">{ moment(post.date).format('DD.MM.YYYY') }</span>
                    </div>
                </div>
                <div className= { `post_user_settings ${isMenuOpen && "active"}` }>
                    <svg onClick = { () => setMenu(true) } xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                    <div className = "post_user_menu" ref = {ref}>
                        <div className = "post_user_menu_item" onClick = { del }>
                            Удалить
                        </div>
                    </div>
                </div>
            </div>
            <div className="post_body" dangerouslySetInnerHTML = {{ __html: post.text }} ></div>
        </div>
    );
}

export default Post;