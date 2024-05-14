import React, { useState } from "react";
import search from "../img/FriendsComponent/images/Search.png"
import { useGetFriendsQuery } from "../services/friendService";
import FriendContainer from "../components/FriendContainer";
import {SortType} from "../types/sortTypes"

const FriendsPage: React.FC = () => {

    const [sortBy, setSortBy] = useState<SortType>(SortType.RecentlyAdded);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);

    const { data: friends, error, isLoading } = useGetFriendsQuery({ 
        request: searchQuery, 
        pageSize: 10, 
        currentPage: currentPage, 
        sortBy: sortBy 
    });
    const totalPages = Math.ceil(friends?.totalDbItems ?? 0 / 10);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query); 
    };
        
    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedSort = event.target.value as SortType;
        setSortBy(selectedSort); 
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      };
      
      const handleNextPage = () => {
        if (currentPage < totalPages) {
          setCurrentPage(currentPage + 1);
        }
      };

    if (isLoading) return <p>Loading...</p>;
    return (
        <div className='content-container'> 
            <div className="head-container">
                <div>
                    <div className="count">{friends?.totalDbItems ?? 0} Friends</div>
                    <div className="sortBy">
                        <div className="sort">Sort by</div>
                             <select className="sortType" onChange={handleSortChange}>
                                {Object.keys(SortType).map((key) => (
                                    <option key={key}>
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
                     <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={handleSearchChange} // Обработчик изменения значения в поле ввода
                    />
                </div>               
            </div>
            {friends?.data.map((friend) => (
                <FriendContainer key={friend.id} onlineStatus={friend.onlineStatus} profile={friend.profile} id={friend.id} />
            ))}
            <div>
                <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>            
        </div>
    );
};

export default FriendsPage