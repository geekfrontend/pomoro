import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import ProfilePage from "./pages/profile";
import NotFoundPage from "./pages/NotFoundPage";
import NotePage from "./pages/note";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";

const App = () => {
  return (
    <div className="">
      <div className="container max-w-[480px] mx-auto bg-neutral-50 dark:bg-gray-900  md:shadow-md md:min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/notes/:id" element={<NotePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
