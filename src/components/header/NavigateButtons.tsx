import React from "react";
import styles from "../../scss/navigate.module.scss"
import { useTranslation } from 'react-i18next';
import '../../i18n';

const NavigateButtons = () => {
    const {t} = useTranslation();

    const homeLabel = t('header.home');
    const friendsLabel = t('header.friends');
    const groupsLabel = t('header.groups');
    const chatsLabel = t('header.chats');
    const notificationsLabel = t('header.notifications');
    const meLabel = t('header.me');
    
    return (
       <div className={styles.navigate}>
            <div className={styles.navigateItem}>
                <button className={styles.home}></button>
                <p>{homeLabel}</p>
            </div>
            <div className={styles.navigateItem}>
            <button className={styles.friends}></button>
                <p>{friendsLabel}</p>
            </div>
            <div className={styles.navigateItem}>
            <button className={styles.groups}></button>
                <p>{groupsLabel}</p>
            </div>
            <div className={styles.navigateItem}>
            <button className={styles.chats}></button>
                <p>{chatsLabel}</p>
            </div>
            <div className={styles.navigateItem}>
                <button className={styles.notifications}></button>
                <p>{notificationsLabel}</p>
            </div>
            <div className={styles.navigateItem}>
                <button className={styles.me}></button>
                <p>{meLabel}</p>
            </div>
       </div>
    );
};

export default NavigateButtons
