import React from "react";
import i18n from "../i18n";
import { locales } from "../types/locales";
import { MenuItem } from "@mui/material";
import style from "../scss/locale.module.scss";
import logo from "../img/logo.jpg";

const Header = () => {

  return (
    <header className={style.header}>
      <img src={logo} />
      <div>
          {Object.keys(locales).map((locale) => 
              <MenuItem 
                className={style.menuItem} 
                key = {locale}
                onClick={()=>i18n.changeLanguage(locale)}
                >
                  {locales[locale as keyof typeof locales]}
              </MenuItem>
          )}
      </div>
    </header>
  );
};
export default Header;
