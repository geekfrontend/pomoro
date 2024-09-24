import { Link } from "react-router-dom";
import { showFormattedDate } from "../../../utils/data";
import { useNote } from "../../../hooks/useNote";
import Loading from "../../../components/Loading";
import { useLocale } from "../../../hooks/useLocale";
import PropTypes from "prop-types";

interface NoteProps {
  note: {
    id: string;
    title: string;
    body: string;
    archived: boolean;
    createdAt: string;
  };
}

const NoteItem = ({ note }: NoteProps) => {
  const { id, title, body, archived, createdAt } = note;
  const {
    deleteNoteById,
    archiveNoteById,
    unarchiveNoteById,
    loadingArchiveNoteId,
    loadingDeleteNoteId,
  } = useNote();
  const { translate, currentLocale } = useLocale();

  const handleArchiveToggle = async () => {
    if (archived) {
      await unarchiveNoteById(note);
    } else {
      await archiveNoteById(note);
    }
  };

  const isArchiveLoading = loadingArchiveNoteId === id;
  const isDeleteLoading = loadingDeleteNoteId === id;

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>
      <span>
        {showFormattedDate(
          createdAt,
          currentLocale === "en" ? "en-US" : "id-ID"
        )}
      </span>
      <p className="mb-3 text-base font-normal text-justify text-gray-500 dark:text-gray-400">
        {body.length > 100 ? `${body.slice(0, 100)}...` : body}
      </p>
      <div className="flex items-center justify-between">
        <div>
          <button
            type="button"
            onClick={() => deleteNoteById(note)}
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            disabled={isDeleteLoading}
          >
            {isDeleteLoading ? (
              <Loading />
            ) : (
              <span>
                <i className="ri-delete-bin-6-fill"></i>
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={handleArchiveToggle}
            className="py-2.5 px-5 me-2 mb-2 text-sm text-blue-700 font-medium focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            disabled={isArchiveLoading}
          >
            {isArchiveLoading ? (
              <Loading />
            ) : archived ? (
              <span>
                <i className="ri-inbox-unarchive-fill"></i>
              </span>
            ) : (
              <i className="ri-inbox-archive-fill"></i>
            )}
          </button>
        </div>
        <Link
          to={`/notes/${id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {translate("readMore")}
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

NoteItem.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    archived: PropTypes.bool.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default NoteItem;
