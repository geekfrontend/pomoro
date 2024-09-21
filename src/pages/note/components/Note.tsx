import Header from "../../../components/Header";
import { useParams, useNavigate } from "react-router-dom";
import { useNote } from "../../../hooks/useNote";
import DefaultLayout from "../../../components/layout/DefaultLayout";
import { showFormattedDate } from "../../../utils/data";
import { useEffect } from "react";
import Loading from "../../../components/Loading";

const NotePage = () => {
  const { id } = useParams<string>();

  const navigate = useNavigate();
  const { fetchNoteById, loading, note } = useNote();

  useEffect(() => {
    if (id) {
      fetchNoteById(id);
    }
  }, [id, fetchNoteById]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <DefaultLayout>
        <Header onBack={handleBack} title="Note" />
        {loading ? (
          <div className="flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          <>
            {note ? (
              <>
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
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400">
                Note not found
              </p>
            )}
          </>
        )}
      </DefaultLayout>
    </>
  );
};

export default NotePage;
