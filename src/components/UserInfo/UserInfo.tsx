import moment from 'moment';
import React from 'react';
import "./UserInfo-module.scss";

type OwnProps = {
    username: string | null,
    isOwn: boolean,
    date: Date | null,
    logout: () => void
}

const UserInfo: React.FC<OwnProps> = ({username, isOwn,date, logout}) => {
    return (
        <div className="user_info">
            <h3 className = "username">{username}</h3>
            <p className = "date">{ moment(date).format("DD.MM.YYYY") }</p>
            { isOwn && <button className = "btn" onClick = {logout}>Выйти</button>}
        </div>
    );
}

export default UserInfo;