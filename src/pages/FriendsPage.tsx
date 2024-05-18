import React, { useEffect, useState } from "react";
import search from "../img/FriendsComponent/images/Search.png"
import { useGetFriendsQuery } from "../services/friendService";
import FriendContainer from "../components/FriendComponent";
import {SortType} from "../types/sortTypes"
import { useTranslation } from 'react-i18next';
import '../i18n';

const FriendsPage: React.FC = () => {
    const {t} = useTranslation();
    const [sortBy, setSortBy] = useState<SortType>(SortType.RecentlyAdded);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [friendsList, setFriendsList] = useState<any[]>([]);
   
    const pageSize = 5;

    const { data: friends, isLoading, refetch } = useGetFriendsQuery({
      request: searchQuery,
      pageSize: pageSize,
      currentPage: currentPage,
      sortBy: sortBy,
    });
  
    const totalPages = friends?.totalDbItems ? Math.ceil(friends?.totalDbItems / pageSize) : 0;
  
    useEffect(() => { //clear curentPage and data
        setCurrentPage(1);
        setFriendsList([]);
    }, []);

    useEffect(() => {
      if (friends?.data) {
        setFriendsList((prevFriends) => [...prevFriends, ...friends.data]);
      }
    }, [friends]);
    console.log("Tolalpages" + totalPages)
    useEffect(() => {
      const handleScroll = () => {
        if ((document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight)) < 1 && !isLoading && currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [currentPage, isLoading, totalPages]);
  
    useEffect(() => {
        refetch();
    }, [friendsList, refetch]);
  
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const query = event.target.value;
      setSearchQuery(query);
      setCurrentPage(1); // Сбрасываем страницу на первую при новом поисковом запросе
      setFriendsList([]); // Очищаем текущий список друзей при новом поисковом запросе
    };
  
    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedSort = event.target.value as SortType;
      setSortBy(selectedSort);
      setCurrentPage(1); // Сбрасываем страницу на первую при изменении сортировки
      setFriendsList([]); // Очищаем текущий список друзей при изменении сортировки
    };
    
    const friendsLabel = t('friends.friends');
    const sortByLabel = t('friends.sort.sortBy');
    const searchLabel = t('friends.search');

    return (
        <div className='content-container'> 
            <div className="head-container">
                <div>
                    <div className="count">{friends?.totalDbItems ?? 0} {friendsLabel}</div>
                    <div className="sortBy">
                        <div className="sort">{sortByLabel}</div>
                             <select className="sortType" onChange={handleSortChange}>
                                {Object.keys(SortType).map((key) => (
                                    <option key={key}>
                                        {t(`friends.sort.${key}`)}
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
                        placeholder={searchLabel}
                        value={searchQuery}
                        onChange={handleSearchChange} // Обработчик изменения значения в поле ввода
                    />
                </div>               
            </div>
            {isLoading ? <p>Loading...</p> : <></>}
            {friendsList.map((friend) => (
                <FriendContainer key={friend.id} onlineStatus={friend.onlineStatus} profile={friend.profile} id={friend.id} />
            ))}
                
        </div>
    );
};

export default FriendsPage