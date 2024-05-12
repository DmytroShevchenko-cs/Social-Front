import React, { useState } from "react";
import logo from "../img/FriendsComponent/images/MaleUser.png"
import search from "../img/FriendsComponent/images/Search.png"
import { useGetFriendsQuery } from "../services/friendService";

const FriendsList: React.FC = () => {
    const { data: friends, error, isLoading } = useGetFriendsQuery({ pageSize: 10, currentPage: 1 });
  
    if (isLoading) return <p>Loading...</p>;
    
    return (
        <div>
            <h2>Friends List</h2>
            {friends?.data && (
                <ul>
                    {friends.data.map((friend) => (
                        <li key={friend.id}>
                            <p>Name: {friend.profile.name}</p>
                            <p>Surname: {friend.profile.surname}</p>
                            <p>Email: {friend.profile.email}</p>
                            
                            {/* Render other profile details as needed */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FriendsList;

// const FriendsPage = () => {
//     return (
//         <div className='content-container'>
//             <div className="head-container">
//                 <div>
//                     <div className="count">30 Friends</div>
//                     <div className="sortBy">
//                         <div className="sort">Sort by</div>
//                         <select  className="sortType">
//                             <option>Online</option>
//                             <option>Recently added</option>
//                             <option>First name</option>
//                             <option>Last name</option>
//                         </select>
//                     </div>
//                 </div>
//                 <div className="search-container">
//                     <span className="search-icon">
//                         <img src={search} alt="Search Icon"/>
//                     </span>
//                     <input type="text" placeholder="Search"/>
//                 </div>               
//             </div>
//             <div className='friend-container'>
//                 <div className="img">
//                     <img src={logo} alt="Logo"/>
//                 </div>
//                 <div className="info">
//                     <p className="name-surname">Name Surname</p>
//                     <p className="desc">tttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt</p>
//                 </div>
//                 <div className="message-button">
//                     <button><label>Message</label></button>
//                 </div>
//                 <div className="action-container">
//                     <button></button>
//                 </div>
//             </div>
//             <div className='friend-container'>
//                 <div className="img">
//                     <img src={logo} alt="Logo"/>
//                 </div>
//                 <div className="info">
//                     <p className="name-surname">Name Surname</p>
//                     <p className="desc">tttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt</p>
//                 </div>
//                 <div className="message-button">
//                     <button><label>Message</label></button>
//                 </div>
//                 <div className="action-container">
//                     <button></button>
//                 </div>
//             </div>
//             <div className='friend-container'>
//                 <div className="img">
//                     <img src={logo} alt="Logo"/>
//                 </div>
//                 <div className="info">
//                     <p className="name-surname">Name Surname</p>
//                     <p className="desc">tttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt</p>
//                 </div>
//                 <div className="message-button">
//                     <button><label>Message</label></button>
//                 </div>
//                 <div className="action-container">
//                     <button></button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default FriendsPage