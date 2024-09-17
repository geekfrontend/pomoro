import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import BottomSheet from "./BottomSheet";
import AddEditNote from "./AddEditNote";
import PropTypes from "prop-types";

const AppBar = ({
  createNote,
}: {
  createNote: (title: string, body: string, archived: boolean) => void;
}) => {
  const { pathname } = useLocation();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const toggleBottomSheet = () => {
    setIsBottomSheetOpen(!isBottomSheetOpen);
  };

  return (
    <div className="fixed bottom-0 w-full max-w-[480px] mx-auto backdrop-blur-">
      <div className="flex items-center justify-between gap-1 px-4 py-2 mx-4 mb-6 bg-white border rounded-full shadow-lg md:mx-16 dark:border-neutral-600 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400">
        <Link to="/">
          <button
            data-tooltip-target="tooltip-home"
            className={`relative py-3 px-5 flex items-center cursor-pointer gap-1 rounded-full
              hover:text-blue-600 dark:hover:text-blue-500 ${
                pathname === "/"
                  ? "bg-blue-200 dark:bg-blue-600 text-blue-800 dark:text-blue-50"
                  : ""
              }`}
          >
            <i className="ri-home-fill"></i>
            <div className="text-sm font-medium">Home</div>
          </button>
          <div
            id="tooltip-home"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
          >
            Go to Home
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
        </Link>

        <button
          data-tooltip-target="tooltip-note"
          type="button"
          className="inline-flex flex-col items-center justify-center p-3 text-gray-500 "
          onClick={toggleBottomSheet}
        >
          <i className="text-3xl ri-add-fill"></i>
          <span className="sr-only">New Note</span>
        </button>
        <div
          id="tooltip-note"
          role="tooltip"
          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
        >
          Create a new note
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>

        <Link to="/profile">
          <button
            data-tooltip-target="tooltip-profile"
            className={`relative py-3 px-5 flex items-center cursor-pointer gap-1 rounded-full
              hover:text-blue-600 dark:hover:text-blue-500 ${
                pathname === "/profile"
                  ? "bg-blue-200 dark:bg-blue-600 text-blue-800 dark:text-blue-50"
                  : ""
              }`}
          >
            <i className="ri-user-fill"></i>
            <div className="text-sm font-medium">Profile</div>
          </button>
          <div
            id="tooltip-profile"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
          >
            View Profile
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
        </Link>
      </div>
      <BottomSheet
        isBottomSheetOpen={isBottomSheetOpen}
        setIsBottomSheetOpen={setIsBottomSheetOpen}
      >
        <AddEditNote
          createNote={createNote}
          setIsBottomSheetOpen={setIsBottomSheetOpen}
        />
      </BottomSheet>
    </div>
  );
};

AppBar.propTypes = {
  createNote: PropTypes.func.isRequired,
};

export default AppBar;
