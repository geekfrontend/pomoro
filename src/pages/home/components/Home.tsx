import { useEffect, useState, useMemo } from "react";
import { useNote } from "../../../hooks/useNote";
import { useLocale } from "../../../hooks/useLocale";
import { useSearchParams } from "react-router-dom";
import Header from "../../../components/Header";
import Search from "../../../components/Search";
import DefaultLayout from "../../../components/layout/DefaultLayout";
import NoteItem from "./NoteItem";
import { useAuth } from "../../../hooks/useAuth";
import Loading from "../../../components/Loading";

const Home = () => {
  const { isAuthenticated } = useAuth();
  const { fetchNotes, notes, archivedNotes, fetchArchivedNotes, loading } =
    useNote();
  const [activeTab, setActiveTab] = useState<"active" | "archive">("active");
  const { translate } = useLocale();
  const [searchParams] = useSearchParams();

  const query = searchParams.get("search")?.toLowerCase() || "";

  useEffect(() => {
    if (isAuthenticated) {
      fetchNotes();
      fetchArchivedNotes();
    }
  }, [fetchNotes, fetchArchivedNotes]);

  const renderNotes = useMemo(() => {
    const currentNotes = activeTab === "active" ? notes : archivedNotes;

    if (!currentNotes) return [];
    if (!query)
      return currentNotes.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

    return currentNotes
      .filter((note) => note.title.toLowerCase().includes(query.toLowerCase()))
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  }, [notes, archivedNotes, activeTab, query]);

  const getTabClass = (tab: "active" | "archive") =>
    activeTab === tab
      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";

  return (
    <DefaultLayout>
      <Header title={`${translate("appName")}`} />
      <Search />

      <div className="max-w-[480px]  mx-auto p-2">
        <button
          onClick={() => setActiveTab("active")}
          className={`text-xs font-medium text-center px-2.5 py-0.5 rounded-full ${getTabClass(
            "active"
          )}`}
        >
          {translate("active")}
        </button>
        <button
          onClick={() => setActiveTab("archive")}
          className={`text-xs font-medium text-center ml-2 px-2.5 py-0.5 rounded-full ${getTabClass(
            "archive"
          )}`}
        >
          {translate("archive")}
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center mt-4">
          <Loading />
        </div>
      ) : (
        <>
          {renderNotes?.length === 0 ? (
            <div className="text-center text-gray-500">
              {translate("notesNotFound")}
            </div>
          ) : (
            <div className="grid pb-32 grid-cols-1 p-2 gap-4 max-w-[480px] mx-auto">
              {renderNotes?.map((note) => (
                <NoteItem key={note.id} note={note} />
              ))}
            </div>
          )}
        </>
      )}
    </DefaultLayout>
  );
};

export default Home;
