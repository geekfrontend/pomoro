import { useSearchParams } from "react-router-dom";
import Header from "../../../components/Header";
import NoteItem from "./NoteItem";
import Search from "../../../components/Search";
import { Note } from "../../../types/note";
import PropTypes from "prop-types";

interface HomeProps {
  notes: Array<Note>;
  deleteNote: (id: string) => void;
  archiveNote: (id: string) => void;
  unarchiveNote: (id: string) => void;
}

const Home = ({ notes, deleteNote, archiveNote, unarchiveNote }: HomeProps) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search")?.toLowerCase() || "";

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(query)
  );

  return (
    <>
      <Header title="Pomoro" />
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

Home.propTypes = {
  notes: PropTypes.array.isRequired,
  deleteNote: PropTypes.func.isRequired,
  archiveNote: PropTypes.func.isRequired,
  unarchiveNote: PropTypes.func.isRequired,
};

export default Home;
