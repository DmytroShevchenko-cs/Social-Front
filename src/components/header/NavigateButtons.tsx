import React from "react";
import styles from "../../scss/navigate.module.scss"
import { useTranslation } from 'react-i18next';
import '../../i18n';
import { NavLink, useLocation } from "react-router-dom";

const NavigateButtons = () => {
    const {t} = useTranslation();

    const homeLabel = t('header.home');
    const friendsLabel = t('header.friends');
    const groupsLabel = t('header.groups');
    const chatsLabel = t('header.chats');
    const notificationsLabel = t('header.notifications');
    const meLabel = t('header.me');
    const location = useLocation();

    return (
        <div className={styles.navigate}>
           <NavLink
                className={`${styles.navigateItem} ${location.pathname === '/' && styles.active}`}
                to="/"
            >
                <button className={styles.home}></button>
                <p>{homeLabel}</p>
            </NavLink>
            <NavLink
                className={`${styles.navigateItem} ${location.pathname === '/friends' && styles.active}`}
                to="/friends"
            >
                <button className={styles.friends}></button>
                <p>{friendsLabel}</p>
                <div className={styles.activeBar}></div>
            </NavLink>
            <NavLink
                className={`${styles.navigateItem} ${location.pathname === '/groups' && styles.active}`}
                to="/groups"
            >
                <button className={styles.groups}></button>
                <p>{groupsLabel}</p>
                <div className={styles.activeBar}></div>
            </NavLink>
            <NavLink
                className={`${styles.navigateItem} ${location.pathname === '/chats' && styles.active}`}
                to="/chats"
            >
                <button className={styles.chats}></button>
                <p>{chatsLabel}</p>
                <div className={styles.activeBar}></div>
            </NavLink>
            <NavLink
                className={`${styles.navigateItem} ${location.pathname === '/notifications' && styles.active}`}
                to="/notifications"
            >
                <button className={styles.notifications}></button>
                <p>{notificationsLabel}</p>
                <div className={styles.activeBar}></div>
            </NavLink>
            <NavLink
                className={`${styles.navigateItem} ${location.pathname === '/profile'}`}
                to="/profile"
            >
                <button className={styles.me}></button>
                <p>{meLabel}</p>
                <div className={styles.activeBar}></div>
            </NavLink>
        </div>
    );
};

export default NavigateButtons
