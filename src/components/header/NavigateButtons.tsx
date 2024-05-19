import React from "react";
import styles from "../../scss/navigate.module.scss"

const NavigateButtons = () => {

    return (
       <div className={styles.navigate}>
            <div className={styles.navigateItem}>
                <button className={styles.home}></button>
                <label>Home</label>
            </div>
            <div className={styles.navigateItem}>
            <button className={styles.friends}></button>
                <label>Friends</label>
            </div>
            <div className={styles.navigateItem}>
            <button className={styles.groups}></button>
                <label>Groups</label>
            </div>
            <div className={styles.navigateItem}>
            <button className={styles.chats}></button>
                <label>Chats</label>
            </div>
            <div className={styles.navigateItem}>
                <button className={styles.notifications}></button>
                <label>Notifications</label>
            </div>               
       </div>
    );
};

export default NavigateButtons
