import React from "react";
import logo from "../../img/header/logo.svg";
import LocaleButtons from "./LocaleButtons"
import NavigateButtons from "./NavigateButtons";
import styles from "../../scss/layout.module.scss"
import Search from "./Search";

const Header = () => {  
  return (
    <header>
      <div className={styles.headerContent}>
        <img src={logo} alt="Logo"/>
        <Search/>
        <NavigateButtons/>
      </div>
      <LocaleButtons />
    </header>
  );
};
export default Header;
