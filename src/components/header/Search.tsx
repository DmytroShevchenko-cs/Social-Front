import React from "react";
import styles from "../../scss/navigate.module.scss"
import search from "../../img/header/Search.svg"
import { useTranslation } from 'react-i18next';
import '../../i18n';

const Search = () => {
    const {t} = useTranslation();
    const searchLabel = t('header.search');

    return (
        <div className={styles.search}>
            <div className={styles.search_container}>
                <span className={styles.search_icon}>
                    <img src={search} alt="Search Icon" />
                </span>
                <input
                    type="text"
                    placeholder={searchLabel}
                // value={searchQuery}
                // onChange={"handleSearchChange"}
                />
            </div>
        </div>
    );
};

export default Search;
