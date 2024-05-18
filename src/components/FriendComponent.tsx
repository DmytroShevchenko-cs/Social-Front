import React, { useState } from "react";
import logo from "../img/FriendsComponent/images/MaleUser.png"
import { IFriend } from "../types/Models/Friend";
import { Link } from "react-router-dom";
import {OnlineStatus} from "../types/Models/Friend";
import ActionMenu from "./ActionMenu";
import { useDelFriendMutation } from "../services/friendService";
import { useAddToBlackListMutation } from "../services/blackListService";
import { useTranslation } from 'react-i18next';
import '../i18n';

const FriendContainer: React.FC<IFriend> = (user : IFriend) => {
    
    const {t} = useTranslation();

    const { id, onlineStatus, profile } = user;
    const chatUrl = `/chat/${id}`;
    const userUrl = `/profile/${id}`;

    const [deleteFriend] = useDelFriendMutation();
    const [addToBlackList] = useAddToBlackListMutation();

    const handleDeleteFriend = async () => {
        await deleteFriend(id)
            .unwrap()
            .then(() => {
                console.log("OK")
                // open api/friends
                
            })
            .catch((error) => {
                console.log(error)
            });
        window.location.reload();
        setActiveMenuId(null); // Скрыть меню после действия
    };


    const handleBlockFriend = async () => {
        await addToBlackList(id)
            .unwrap()
            .then(() => {
                console.log("OK")
                // open api/friends
                
            })
            .catch((error) => {
                console.log(error)
            });
        window.location.reload();
        setActiveMenuId(null); 
    };

    const [activeMenuId, setActiveMenuId] = useState<number | null>(null);

    const handleToggleMenu = (menuId: number) => {
        setActiveMenuId(activeMenuId === menuId ? null : menuId); // Toggle the active menu
    };
    
    const messageLabel = t('friends.message');

    return (
        <div key={id} className="friend-container">
            <div className="img">
                <div>
                    {onlineStatus === OnlineStatus.Online ? (
                        <div className="online-status"></div>
                    ) : null}
                </div>
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
                <Link to={chatUrl}>
                    <button><label>{messageLabel}</label></button>
                </Link>
            </div>
            <div className="action-container">
                <button onClick={() => handleToggleMenu(id)}></button>
                {activeMenuId === id && (
                    <ActionMenu
                        onDelete={handleDeleteFriend}
                        onBlock={handleBlockFriend}
                    />
                )}
            </div>
        </div>
    );
};

export default FriendContainer;

