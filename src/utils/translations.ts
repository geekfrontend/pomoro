import { Locale } from "../types/locale";

export const translations: Record<Locale, Record<string, string>> = {
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
