import { useEffect, useState } from "react";
import { useNote } from "../../../hooks/useNote";
import Header from "../../../components/Header";
import Search from "../../../components/Search";
import DefaultLayout from "../../../components/layout/DefaultLayout";
import NoteItem from "./NoteItem";

const Home = () => {
  const { fetchNotes, notes, archivedNotes, fetchArchivedNotes } = useNote();

  const [activeTab, setActiveTab] = useState<"active" | "archive">("active");

  useEffect(() => {
    fetchNotes();
    fetchArchivedNotes();
  }, [fetchNotes, fetchArchivedNotes]);

  const renderNotes = activeTab === "active" ? notes : archivedNotes;

  const getTabClass = (tab: "active" | "archive") =>
    activeTab === tab
      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";

  return (
    <DefaultLayout>
      <Header title="Pomoro" />
      <Search />

      <div className="max-w-[480px]  mx-auto p-2">
        <button
          onClick={() => setActiveTab("active")}
          className={`text-xs font-medium text-center px-2.5 py-0.5 rounded-full ${getTabClass(
            "active"
          )}`}
        >
          Active
        </button>
        <button
          onClick={() => setActiveTab("archive")}
          className={`text-xs font-medium text-center ml-2 px-2.5 py-0.5 rounded-full ${getTabClass(
            "archive"
          )}`}
        >
          Archive
        </button>
      </div>

      {renderNotes?.length === 0 ? (
        <div className="text-center text-gray-500">No notes found</div>
      ) : (
        <div className="grid pb-32 grid-cols-1 p-2 gap-4 max-w-[480px] mx-auto">
          {renderNotes?.map((note) => (
            <NoteItem key={note.id} note={note} />
          ))}
        </div>
      )}
    </DefaultLayout>
  );
};

export default Home;
