import Header from "../../../components/Header";
import { useParams, useNavigate } from "react-router-dom";
import { getNoteById, showFormattedDate } from "../../../utils/data";
import { useEffect, useState } from "react";
import { Note } from "../../../types/note";

const NotePage = () => {
  const { id } = useParams<string>();
  const [note, setNote] = useState<Note | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchedNote = getNoteById(id);
      if (fetchedNote) {
        setNote(fetchedNote);
      } else {
        setNote(null);
      }
    }
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (note === null) {
    return (
      <div className="relative flex justify-center min-h-screen bg-gray-100 items-top dark:bg-gray-900 sm:items-center sm:pt-0">
        <div className="max-w-xl mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center pt-8 sm:justify-start sm:pt-0">
            <div className="px-4 text-lg tracking-wider text-gray-500 border-r border-gray-400">
              404
            </div>
            <div className="ml-4 text-lg tracking-wider text-gray-500 uppercase">
              Not Found
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header onBack={handleBack} title="Note" />
      <div className="p-2">
        <h1 className="mb-4 text-4xl font-extrabold text-transparent text-gray-900 dark:text-white bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          {note.title}
        </h1>
        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          {showFormattedDate(note.createdAt)}
        </p>
        <p className="mb-3 text-justify text-gray-500 dark:text-gray-400">
          {note.body}
        </p>
      </div>
    </>
  );
};

export default NotePage;
