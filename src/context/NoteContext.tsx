import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import {
  createNote,
  getNotes,
  getArchivedNotes,
  archiveNote,
  unarchiveNote,
  deleteNote,
  getNoteById,
} from "../services/note/noteService";
import { CreateNoteRequest, GetNotesResponse } from "../services/note/dto";

interface Note {
  id: string;
  title: string;
  body: string;
  archived: boolean;
  createdAt: string;
}

interface NoteContextType {
  notes: Note[] | null;
  note: Note | null;
  archivedNotes: Note[];
  loading: boolean;
  loadingAddNote: boolean;
  loadingArchiveNoteId: string | null;
  loadingDeleteNoteId: string | null;
  error: string | null;
  addNote: (data: CreateNoteRequest) => Promise<void>;
  fetchNotes: () => Promise<void>;
  archiveNoteById: (note: Note) => Promise<void>;
  unarchiveNoteById: (note: Note) => Promise<void>;
  deleteNoteById: (note: Note) => Promise<void>;
  fetchArchivedNotes: () => Promise<void>;
  fetchNoteById: (id: string) => Promise<void>;
}

interface NotesProviderProps {
  children: ReactNode;
}

export const NoteContext = createContext<NoteContextType | undefined>(
  undefined
);

export default function NotesProvider({ children }: NotesProviderProps) {
  const [notes, setNotes] = useState<Note[] | null>([]);
  const [note, setNote] = useState<Note | null>(null);
  const [archivedNotes, setArchivedNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingArchiveNoteId, setLoadingArchiveNoteId] = useState<
    string | null
  >(null);
  const [loadingDeleteNoteId, setLoadingDeleteNoteId] = useState<string | null>(
    null
  );
  const [loadingAddNote, setLoadingAddNote] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = useCallback(async () => {
    setLoading(true);
    try {
      const response: GetNotesResponse | null = await getNotes();
      if (response) {
        const { data } = response;
        setNotes(data ?? null);
      }
    } catch (error) {
      console.log(error);
      setError("Failed to fetch notes");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchNoteById = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const response = await getNoteById(id);
      if (response) {
        const { data } = response;
        setNote(data ?? null);
      }
    } catch (error) {
      console.log(error);
      setError("Failed to fetch note");
    } finally {
      setLoading(false);
    }
  }, []);
  const fetchArchivedNotes = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getArchivedNotes();
      if (response) {
        const { data } = response;
        setArchivedNotes(data ?? []);
      }
    } catch (error) {
      console.log(error);
      setError("Failed to fetch archived notes");
    } finally {
      setLoading(false);
    }
  }, []);

  const addNote = useCallback(async (data: CreateNoteRequest) => {
    setLoadingAddNote(true);
    try {
      const response = await createNote({ title: data.title, body: data.body });
      if (response && response.data) {
        const noteData: Note = response.data;
        setNotes((prevNotes) =>
          prevNotes ? [...prevNotes, noteData] : [noteData]
        );
      }
    } catch (error) {
      console.log(error);
      setError("Failed to create note");
    } finally {
      setLoadingAddNote(false);
    }
  }, []);

  const archiveNoteById = useCallback(async (note: Note) => {
    setLoadingArchiveNoteId(note.id);
    try {
      const response = await archiveNote(note.id);
      if (response) {
        setNotes((prevNotes) =>
          prevNotes ? prevNotes.filter((n) => n.id !== note.id) : []
        );
        note.archived = true;
        setArchivedNotes((prevArchivedNotes) => [
          ...(prevArchivedNotes || []),
          note,
        ]);
      }
    } catch (error) {
      console.log(error);
      setError("Failed to archive note");
    } finally {
      setLoadingArchiveNoteId(null);
    }
  }, []);

  const unarchiveNoteById = useCallback(async (note: Note) => {
    setLoadingArchiveNoteId(note.id);
    try {
      const response = await unarchiveNote(note.id);
      if (response) {
        setArchivedNotes((prevArchivedNotes) =>
          prevArchivedNotes
            ? prevArchivedNotes.filter((n) => n.id !== note.id)
            : []
        );
        note.archived = false;
        setNotes((prevNotes) => [...(prevNotes || []), note]);
      }
    } catch (error) {
      console.log(error);
      setError("Failed to unarchive note");
    } finally {
      setLoadingArchiveNoteId(null);
    }
  }, []);

  const deleteNoteById = useCallback(async (note: Note) => {
    setLoadingDeleteNoteId(note.id);
    try {
      const response = await deleteNote(note.id);
      if (response) {
        setNotes((prevNotes) =>
          prevNotes ? prevNotes.filter((n) => n.id !== note.id) : []
        );
        setArchivedNotes((prevArchivedNotes) =>
          prevArchivedNotes
            ? prevArchivedNotes.filter((n) => n.id !== note.id)
            : []
        );
      }
    } catch (error) {
      console.log(error);
      setError("Failed to delete note");
    } finally {
      setLoadingDeleteNoteId(null);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const value = {
    notes,
    note,
    archivedNotes,
    loading,
    loadingAddNote,
    loadingArchiveNoteId,
    loadingDeleteNoteId,
    error,
    addNote,
    fetchNotes,
    fetchArchivedNotes,
    archiveNoteById,
    unarchiveNoteById,
    deleteNoteById,
    fetchNoteById,
  };

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
}
