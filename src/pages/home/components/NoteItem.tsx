import { Link } from "react-router-dom";
import { showFormattedDate } from "../../../utils/data";
import PropTypes from "prop-types";

interface NoteProps {
  note: {
    id: string;
    title: string;
    body: string;
    archived: boolean;
    createdAt: string;
  };
  deleteNote: (id: string) => void;
  archiveNote: (id: string) => void;
  unarchiveNote: (id: string) => void;
}

const NoteItem = ({
  note,
  deleteNote,
  archiveNote,
  unarchiveNote,
}: NoteProps) => {
  const { id, title, body, archived, createdAt } = note;

  return (
    <div key={id}>
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <span>{showFormattedDate(createdAt)}</span>
        <p className="mb-3 text-base font-normal text-justify text-gray-500 dark:text-gray-400">
          {body.length > 100 ? `${body.slice(0, 100)}...` : body}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <button
              type="button"
              onClick={() => deleteNote(id)}
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Delete
            </button>

            <button
              type="button"
              onClick={() => (archived ? unarchiveNote(id) : archiveNote(id))}
              className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              {archived ? "Unarchive" : "Archive"}
            </button>
          </div>
          <Link
            to={`/notes/${id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read more
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
    </div>
  );
};

NoteItem.propTypes = {
  note: PropTypes.object.isRequired,
  deleteNote: PropTypes.func.isRequired,
  archiveNote: PropTypes.func.isRequired,
  unarchiveNote: PropTypes.func.isRequired,
};

export default NoteItem;
