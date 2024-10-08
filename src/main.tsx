import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./context/AuthContext.tsx";
import ThemeProvider from "./context/ThemeContext";
import LocaleProvider from "./context/LocaleContext.tsx";
import NoteProvider from "./context/NoteContext.tsx";
import ToastProvider from "./context/ToastContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <LocaleProvider>
          <NoteProvider>
            <ToastProvider>
              <Router>
                <App />
              </Router>
            </ToastProvider>
          </NoteProvider>
        </LocaleProvider>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
