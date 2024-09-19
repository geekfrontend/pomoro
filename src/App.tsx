import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import ProfilePage from "./pages/profile";
import NotFoundPage from "./pages/NotFoundPage";
import NotePage from "./pages/note";
import ArchivePage from "./pages/archive";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";

const App = () => {
  return (
    <div className="bg-neutral-50 dark:bg-neutral-800 md:bg-neutral-50 md:dark:bg-neutral-50">
      <div className="max-w-[480px] mx-auto bg-neutral-50 dark:bg-neutral-800 md:shadow-md md:min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/notes/archive" element={<ArchivePage />} />
          <Route path="/notes/:id" element={<NotePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
