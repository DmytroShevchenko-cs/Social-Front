import React from "react";
import style from "../scss/header.module.scss";
import logo from "../img/logo.jpg";
import LocaleButtons from "./LocaleBattons"

const Header = () => {

  return (
    <header className={style.header}>
      <img src={logo} alt="Logo"/>
      <LocaleButtons />
    </header>
  );
};
export default Header;
