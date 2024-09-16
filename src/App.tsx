import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import AppBar from "./components/AppBar";
import HomePage from "./pages/home";
import ProfilePage from "./pages/profile";
import NotFoundPage from "./pages/NotFoundPage";
import NotePage from "./pages/note";
import ArchivePage from "./pages/archive";
import {
  createNote,
  getArchivedNotes,
  getUnarchivedNotes,
  deleteNote,
  archiveNote,
  unarchiveNote,
} from "./utils/data";

const App = () => {
  const [activeNotes, setActiveNotes] = useState(getUnarchivedNotes() || []);
  const [archivedNotes, setArchivedNotes] = useState(getArchivedNotes() || []);

  const refreshNotes = () => {
    setActiveNotes(getUnarchivedNotes());
    setArchivedNotes(getArchivedNotes());
  };

  const handleCreateNote = (title: string, body: string, archived: boolean) => {
    createNote(title, body, archived);
    refreshNotes();
  };

  const handleDeleteNote = (id: string) => {
    deleteNote(id);
    refreshNotes();
  };

  const handleArchiveNote = (id: string) => {
    archiveNote(id);
    refreshNotes();
  };

  const handleUnarchiveNote = (id: string) => {
    unarchiveNote(id);
    refreshNotes();
  };

  return (
    <div className="bg-neutral-50 dark:bg-neutral-800 md:bg-neutral-50 md:dark:bg-neutral-50">
      <div className="max-w-[480px] mx-auto bg-neutral-50 dark:bg-neutral-800 md:shadow-md md:min-h-screen">
        <AppBar createNote={handleCreateNote} />

        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                notes={activeNotes}
                deleteNote={handleDeleteNote}
                archiveNote={handleArchiveNote}
                unarchiveNote={handleUnarchiveNote}
              />
            }
          />
          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="/notes/archive"
            element={
              <ArchivePage
                notes={archivedNotes}
                deleteNote={handleDeleteNote}
                archiveNote={handleArchiveNote}
                unarchiveNote={handleUnarchiveNote}
              />
            }
          />
          <Route path="/notes/:id" element={<NotePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
