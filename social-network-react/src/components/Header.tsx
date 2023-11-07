import React from "react";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";

import style from "../css/mainPage.module.css";

const Header = () => {
  return (
    <header>
      <img src={logo} />
    </header>
  );
};
export default Header;
