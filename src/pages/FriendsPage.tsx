import React from "react";
import search from "../img/FriendsComponent/images/Search.png"
import { useGetFriendsQuery } from "../services/friendService";
import FriendContainer from "../components/FriendContainer";
import {SortType} from "../types/sortTypes"

const FriendsPage: React.FC = () => {


    const { data: friends, error, isLoading } = useGetFriendsQuery({ pageSize: 10, currentPage: 1, sortBy: SortType.RecentlyAdded });
    
    if (isLoading) return <p>Loading...</p>;
    return (
        <div className='content-container'>
            <div className="head-container">
                <div>
                    <div className="count">30 Friends</div>
                    <div className="sortBy">
                        <div className="sort">Sort by</div>
                             <select className="sortType">
                                {Object.keys(SortType).map((key) => (
                                    <option>
                                        {SortType[key as keyof typeof SortType]}
                                    </option>
                                ))}
                            </select>                       
                    </div>
                </div>
                <div className="search-container">
                    <span className="search-icon">
                        <img src={search} alt="Search Icon"/>
                    </span>
                    <input type="text" placeholder="Search"/>
                </div>               
            </div>
            {friends?.data.map((friend) => (
                <FriendContainer onlineStatus={friend.onlineStatus} profile={friend.profile} id={friend.id} />
            ))}
        </div>
    );
};

export default FriendsPage