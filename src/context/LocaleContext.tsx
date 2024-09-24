import { createContext, useState, ReactNode } from "react";
import { Locale } from "../types/locale";
import { translations } from "../utils/translations";
import PropTypes from "prop-types";

interface LocaleContextProps {
  currentLocale: Locale;
  changeCurrentLocale: (newLocale: Locale) => void;
  translate: (key: string) => string;
}

export const LocaleContext = createContext<LocaleContextProps>({
  currentLocale: "en",
  changeCurrentLocale: () => {},
  translate: (key: string) => key,
});

interface LocaleProviderProps {
  children: ReactNode;
}

LocaleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function LocaleProvider({ children }: LocaleProviderProps) {
  const persistedLocale = localStorage.getItem("locale") as Locale;
  const [locale, setLocale] = useState<Locale>(persistedLocale || "en");

  const changeCurrentLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem("locale", newLocale);
  };

  const translate = (key: string) => {
    return translations[locale][key] || key;
  };

  return (
    <LocaleContext.Provider
      value={{ currentLocale: locale, changeCurrentLocale, translate }}
    >
      {children}
    </LocaleContext.Provider>
  );
}
