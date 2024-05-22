import React from "react";
import logo from "../../img/header/logo.svg";
import LocaleButtons from "./LocaleButtons"
import NavigateButtons from "./NavigateButtons";
import styles from "../../scss/layout.module.scss"
import Search from "./Search";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Header = () => {  
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuth);
  return (
    <header>
      <div className={styles.headerContent}>
        <img src={logo} alt="Logo"/>
        {isAuthenticated ? <Search/>: null}
        {isAuthenticated ? <NavigateButtons/> : null}
      </div>
      <LocaleButtons />
    </header>
  );
};
export default Header;
