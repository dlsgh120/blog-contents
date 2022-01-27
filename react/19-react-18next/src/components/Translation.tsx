import React from "react";
import {useTranslation} from "react-i18next";
import i18next from "../lang/i18n";

const Translation: React.FC = () =>{
    const {t} = useTranslation();

    const clickHandler = (lang:string) =>{
        i18next.changeLanguage(lang);
    }
    return(
        <div>
            <button onClick={()=>clickHandler("ko")}>KO</button>
            <button onClick={()=>clickHandler("en")}>EN</button>
            <button onClick={()=>clickHandler("jp")}>JP</button>
            <p>{t("hello")}</p>
            <p>{t("name")}</p>
        </div>
    );
}

export default Translation;