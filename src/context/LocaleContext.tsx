import { createContext, useContext, useState, ReactNode } from "react";
import { Locale } from "../types/locale";

const translations: Record<Locale, Record<string, string>> = {
  en: {
    welcome: "Hey, Welcome Back",
    email: "Email",
    password: "Password",
    submit: "Login",
    noAccount: "Don't have an account?",
    signUp: "Sign up",
    switchTo: "Switch to Indonesian",
  },
  id: {
    welcome: "Halo, Selamat Datang Kembali",
    email: "Email",
    password: "Kata Sandi",
    submit: "Masuk",
    noAccount: "Belum punya akun?",
    signUp: "Daftar",
    switchTo: "Berpindah ke Inggris",
  },
};

interface LocaleContextProps {
  currentLocale: Locale;
  changeCurrentLocale: (newLocale: Locale) => void;
  translate: (key: string) => string;
}

const LocaleContext = createContext<LocaleContextProps>({
  currentLocale: "en",
  changeCurrentLocale: () => {},
  translate: (key: string) => key,
});

interface LocaleProviderProps {
  children: ReactNode;
}

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

export const useLocale = () => useContext(LocaleContext);
