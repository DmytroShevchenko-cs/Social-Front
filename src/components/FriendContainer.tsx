import React from "react";
import logo from "../img/FriendsComponent/images/MaleUser.png"
import { IFriend } from "../types/Models/Friend";

const FriendContainer: React.FC<IFriend> = ({ onlineStatus, profile  }) => {
    
    const { name, surname, description, avatarImage } = profile;

    return (
        <div className='friend-container'>
            <div className="img">
                <img src={logo} alt="Logo" />
            </div>
            <div className="info">
                <p className="name-surname">{name} {surname}</p>
                <p className="desc">{description}</p>
            </div>
            <div className="message-button">
                <button><label>Message</label></button>
            </div>
            <div className="action-container">
                <button></button>
            </div>
        </div>
    );
};

export default FriendContainer;
