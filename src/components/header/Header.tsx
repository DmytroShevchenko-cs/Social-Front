import React from "react";
import logo from "../../img/logo.png";
import LocaleButtons from "./LocaleButtons"
import NavigateButtons from "./NavigateButtons";

const Header = () => {

  return (
    <header>
      <img src={logo} alt="Logo"/>
      <NavigateButtons/>
      <LocaleButtons />
    </header>
  );
};
export default Header;
