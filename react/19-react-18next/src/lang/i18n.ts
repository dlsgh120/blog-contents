import i18n from "i18next";
import { initReactI18next } from "react-i18next";
 
import TranslationEn from "./translation.en.json";
import TranslationKo from "./translation.ko.json";
import TranslationJp from "./translation.jp.json";
 
const resource = {
    en: {
        translations: TranslationEn
    },
    ko: {
        translations: TranslationKo
    },
    jp: {
        translations: TranslationJp
    }
}
 
i18n
    .use(initReactI18next)
    .init({
        resources:resource,
        // 초기 설정 언어
        lng: "ko",
        fallbackLng: "ko",
        debug: true,
        defaultNS: "translations",
        ns: "translations",
        keySeparator: false,
        interpolation: {
            escapeValue: false
        }
    })
 
export default i18n;