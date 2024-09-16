import { Note } from "../types/note";

const notes: Note[] = [
  {
    id: "notes-1",
    title: "Babel",
    body: "Babel merupakan tools open-source yang digunakan untuk mengubah sintaks ECMAScript 2015+ menjadi sintaks yang didukung oleh JavaScript engine versi lama. Babel sering dipakai ketika kita menggunakan sintaks terbaru termasuk sintaks JSX.",
    createdAt: "2022-04-14T04:27:34.572Z",
    archived: false,
  },
  {
    id: "notes-2",
    title: "Functional Component",
    body: "Functional component merupakan React component yang dibuat menggunakan fungsi JavaScript. Agar fungsi JavaScript dapat disebut component ia harus mengembalikan React element dan dipanggil layaknya React component.",
    createdAt: "2022-04-14T04:27:34.572Z",
    archived: false,
  },
  {
    id: "notes-3",
    title: "Modularization",
    body: "Dalam konteks pemrograman JavaScript, modularization merupakan teknik dalam memecah atau menggunakan kode dalam berkas JavaScript secara terpisah berdasarkan tanggung jawabnya masing-masing.",
    createdAt: "2022-04-14T04:27:34.572Z",
    archived: false,
  },
  {
    id: "notes-4",
    title: "Lifecycle",
    body: "Dalam konteks React component, lifecycle merupakan kumpulan method yang menjadi siklus hidup mulai dari component dibuat (constructor), dicetak (render), pasca-cetak (componentDidMount), dan sebagainya. ",
    createdAt: "2022-04-14T04:27:34.572Z",
    archived: false,
  },
  {
    id: "notes-5",
    title: "ESM",
    body: "ESM (ECMAScript Module) merupakan format modularisasi standar JavaScript.",
    createdAt: "2022-04-14T04:27:34.572Z",
    archived: false,
  },
  {
    id: "notes-6",
    title: "Module Bundler",
    body: "Dalam konteks pemrograman JavaScript, module bundler merupakan tools yang digunakan untuk menggabungkan seluruh modul JavaScript yang digunakan oleh aplikasi menjadi satu berkas.",
    createdAt: "2022-04-14T04:27:34.572Z",
    archived: true,
  },
];

const findNoteIndexById = (id: string): number => {
  return notes.findIndex((note) => note.id === id);
};

const createNote = (title: string, body: string, archived: boolean): Note => {
  const createdAt = new Date().toISOString();
  const id = crypto.randomUUID();
  const newNote: Note = { id, title, body, createdAt, archived };
  notes.push(newNote);
  console.log(notes);
  return newNote;
};

const deleteNote = (id: string): void => {
  const index = findNoteIndexById(id);
  if (index !== -1) {
    notes.splice(index, 1);
  }
};

const archiveNote = (id: string): void => {
  const index = findNoteIndexById(id);
  if (index !== -1) {
    notes[index].archived = true;
  }
};

const unarchiveNote = (id: string): void => {
  const index = findNoteIndexById(id);
  if (index !== -1) {
    notes[index].archived = false;
  }
};

const updateNote = (id: string, title: string, body: string): void => {
  const index = findNoteIndexById(id);
  if (index !== -1) {
    notes[index].title = title;
    notes[index].body = body;
  }
};

const getNotes = (): Note[] => {
  return [...notes];
};

const getArchivedNotes = (): Note[] => {
  return notes.filter((note) => note.archived);
};

const getUnarchivedNotes = (): Note[] => {
  return notes.filter((note) => !note.archived);
};

const getNoteById = (id: string): Note | undefined => {
  return notes.find((note) => note.id === id);
};

const searchNotes = (query: string): Note[] => {
  return notes.filter((note) =>
    note.title.toLowerCase().includes(query.toLowerCase())
  );
};
const showFormattedDate = (date: string): string => {
  try {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
      throw new Error("Invalid date");
    }

    return parsedDate.toLocaleDateString("en-US", options);
  } catch (error) {
    console.error(error);
    return "Invalid date";
  }
};

export {
  notes,
  createNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
  updateNote,
  getNotes,
  getArchivedNotes,
  getUnarchivedNotes,
  getNoteById,
  searchNotes,
  showFormattedDate,
};
