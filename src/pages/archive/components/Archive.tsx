import { useSearchParams } from "react-router-dom";
import Header from "../../../components/Header";
import NoteItem from "../../home/components/NoteItem";
import Search from "../../../components/Search";
import { Note } from "../../../types/note";

interface ArchiveProps {
  notes: Array<Note>;
  deleteNote: (id: string) => void;
  archiveNote: (id: string) => void;
  unarchiveNote: (id: string) => void;
}

const Archive = ({
  notes,
  deleteNote,
  archiveNote,
  unarchiveNote,
}: ArchiveProps) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search")?.toLowerCase() || "";

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(query)
  );
  return (
    <>
      <Header title="Archive" />
      <Search />
      <div className="grid pb-32 grid-cols-1 p-2 gap-4 max-w-[480px] mx-auto">
        {notes.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No notes found
          </p>
        ) : (
          filteredNotes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              deleteNote={deleteNote}
              archiveNote={archiveNote}
              unarchiveNote={unarchiveNote}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Archive;
