import { createContext, useContext } from 'react';
import ar from './ar.js';
import en from './en.js';

const dict = { ar, en };

export const I18nContext = createContext({ lang: 'en', t: (k) => k, setLang: () => {} });
export const useT = () => useContext(I18nContext);

export function makeT(lang) {
  return (key, vars) => {
    let s = (dict[lang] && dict[lang][key]) ?? dict.en[key] ?? key;
    if (vars) for (const k in vars) s = s.split('{' + k + '}').join(String(vars[k]));
    return s;
  };
}

export const detectLang = () =>
  (navigator.language || 'en').toLowerCase().startsWith('ar') ? 'ar' : 'en';
