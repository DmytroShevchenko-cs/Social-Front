import React from "react";
import logo from "../img/FriendsComponent/images/logo.jpg"
import { IFriend } from "../types/Models/Friend";
import { Link } from "react-router-dom";
import {OnlineStatus} from "../types/Models/Friend";

const FriendContainer: React.FC<IFriend> = (user : IFriend) => {
    
    const { id, onlineStatus, profile } = user;
    const chatUrl = `/chat/${id}`;
    const userUrl = `/profile/${id}`;
    
    return (
        <div key = {id} className='friend-container'>
            <div className="img">
                <div>{onlineStatus === OnlineStatus.Online ? <div className="online-status"></div> : null}</div>
                <Link to={userUrl}>
                    <img src={logo} alt={`${id}`} />
                </Link>
                
            </div>
           
            <div className="info">
                <Link to={userUrl} className="name-surname">
                    <p>{profile.name} {profile.surname}</p>
                </Link>
                <p className="desc">{profile.description}</p>
            </div>
            <div className="message-button">
                <Link to={chatUrl}><button><label>Message</label></button></Link>
            </div>
            <div className="action-container">
                <button></button>
            </div>
        </div>
    );
};

export default FriendContainer;
