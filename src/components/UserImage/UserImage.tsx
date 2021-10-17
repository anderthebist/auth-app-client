import React from 'react';
import "./UserImage-module.scss";

type OwnProps = {
    image: string | null,
    isOwn: boolean,
    changeUserImage: (image: any) => void
}

const UserImage: React.FC<OwnProps> = ({changeUserImage, image, isOwn}) => {
    const changeFile = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if(event.target.files?.length)
            changeUserImage(event.target.files[0]);
    }

    return (
        <div className="user_image">
            {
                isOwn && 
                <div className="add_block">
                    +
                    <input type="file" name = "image" onChange = {changeFile} className = "user_image_change"/>
                </div>
            }
            <img src={`http://localhost:7000/${image || "user.png"}`} alt="" />
        </div>
    );
}

export default UserImage;