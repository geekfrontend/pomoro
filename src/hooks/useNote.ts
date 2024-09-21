import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";

export const useNote = () => {
  const context = useContext(NoteContext);
  if (context === undefined) {
    throw new Error("useNote must be used within a NoteProvider");
  }
  return context;
};
