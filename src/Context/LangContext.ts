import { createContext, useContext } from 'react';
import ENJson from '../locale/en/translation.json';
import RUJson from '../locale/ru/translation.json';
import UAJson from '../locale/ua/translation.json';

export enum Lang {
    UA = 'UA',
    RU = 'RU',
    EN = 'EN',
    UNKNOWN = ''
}

export type LangContextType = {
    lang: Lang;
    setLang: (Lang: Lang) => void;
}

export const getUserLang = (): any => {
    const lsLang = localStorage.getItem("language");
    const userLanguage = window.navigator.language;
    let res = '';
    let currentLang = {};

    if (lsLang) {
        console.log('LC', lsLang);
        currentLang = lsLang === 'EN' ? ENJson : lsLang === 'RU' ? RUJson : UAJson;
    } else {
        console.log('NOT LC', lsLang);
        if (userLanguage.match('en-')) {
            res = Lang.EN;
            currentLang = ENJson;
        } else if (userLanguage.match('ru')) {
            res = Lang.RU;
            currentLang = RUJson;
        } else {
            res = Lang.UA;
            currentLang = UAJson;
        }
        
        localStorage.setItem("language", res);
    }

    return {
        'userLang': res,
        'arrayLang': currentLang
    };
}

export const LangContext = createContext<LangContextType>({
    lang: getUserLang().userLang,
    setLang: (lang) => {
        console.warn('no lang provider');
        localStorage.setItem("language", lang);
    }
});

export const useLang = () => useContext(LangContext);
