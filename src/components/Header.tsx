import React from "react";
import i18n from "../i18n";
import { locales } from "../types/locales";
import { MenuItem } from "@mui/material";

const Header = () => {

  return (
    <header>
      <img alt="some test text" />
      <div>
          {Object.keys(locales).map((locale) => 
              <MenuItem key = {locale}
                onClick={()=>i18n.changeLanguage(locale)}>
                  {locales[locale as keyof typeof locales]}
              </MenuItem>
          )}
      </div>
    </header>
  );
};
export default Header;
