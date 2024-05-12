import React from "react";
import logo from "../img/logo.png";
import LocaleButtons from "./LocaleButtons"

const Header = () => {

  return (
    <header>
      <img src={logo} alt="Logo"/>
      <LocaleButtons />
    </header>
  );
};
export default Header;
