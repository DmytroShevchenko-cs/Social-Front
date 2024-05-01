import React from "react";
import i18n from "../i18n";
import { locales } from "../types/locales";
import style from "../scss/locale.module.scss";

const localeButtons = () => {

    return(
        <div className = {style.button_container}>
            {Object.keys(locales).map((locale) => 
                <button 
                className={style.menuItem} 
                key = {locale}
                onClick={()=>i18n.changeLanguage(locale)}
                >
                    {locales[locale as keyof typeof locales]}
                </button>
            )}
        </div>
    );
};

export default localeButtons
