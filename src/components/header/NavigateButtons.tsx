import React from "react";
import styles from "../../scss/navigate.module.scss"

const NavigateButtons = () => {

    return (
       <div className={styles.navigate}>
            <div className={styles.navigateItem}>
                <button className={styles.home}></button>
                <p>Home</p>
            </div>
            <div className={styles.navigateItem}>
            <button className={styles.friends}></button>
                <p>Friends</p>
            </div>
            <div className={styles.navigateItem}>
            <button className={styles.groups}></button>
                <p>Groups</p>
            </div>
            <div className={styles.navigateItem}>
            <button className={styles.chats}></button>
                <p>Chats</p>
            </div>
            <div className={styles.navigateItem}>
                <button className={styles.notifications}></button>
                <p>Notifications</p>
            </div>               
       </div>
    );
};

export default NavigateButtons
