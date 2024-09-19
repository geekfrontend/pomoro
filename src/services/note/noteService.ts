import { config } from "../../config";
import axios from "axios";
import {
  CreateNoteRequest,
  CreateNoteResponse,
  GetNotesResponse,
  GetArchivedNotesResponse,
  GetNoteByIdResponse,
  ArchiveNoteResponse,
  UnarchiveNoteResponse,
  DeleteNoteResponse,
} from "./dto";
import { getHeaders } from "../../services/utils";

const BASE_NOTES_URL = `${config.BASE_URL}/notes`;

export const createNote = async ({
  title,
  body,
}: CreateNoteRequest): Promise<CreateNoteResponse | null> => {
  try {
    const res = await axios.post(
      BASE_NOTES_URL,
      { title, body },
      { headers: getHeaders() }
    );
    return res.data;
  } catch (error) {
    console.error("Failed to create note:", error);
    return null;
  }
};

export const getNotes = async (): Promise<GetNotesResponse | null> => {
  try {
    const res = await axios.get(BASE_NOTES_URL, {
      headers: getHeaders(),
    });
    if (res.status === 200) {
      return res.data;
    } else {
      console.warn("Unexpected response status:", res.status);
      return null;
    }
  } catch (error) {
    console.error("Error fetching notes:", error);
    return null;
  }
};

export const getArchivedNotes =
  async (): Promise<GetArchivedNotesResponse | null> => {
    try {
      const res = await axios.get(`${BASE_NOTES_URL}?archived=true`, {
        headers: getHeaders(),
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching archived notes:", error);
      return null;
    }
  };

export const getNoteById = async (
  id: string
): Promise<GetNoteByIdResponse | null> => {
  try {
    const res = await axios.get(`${BASE_NOTES_URL}/${id}`, {
      headers: getHeaders(),
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching note by ID:", error);
    return null;
  }
};

export const archiveNote = async (
  id: string
): Promise<ArchiveNoteResponse | null> => {
  try {
    const res = await axios.post(
      `${BASE_NOTES_URL}/${id}/archive`,
      {},
      { headers: getHeaders() }
    );
    return res.data;
  } catch (error) {
    console.error("Error archiving note:", error);
    return null;
  }
};

export const unarchiveNote = async (
  id: string
): Promise<UnarchiveNoteResponse | null> => {
  try {
    const res = await axios.post(
      `${BASE_NOTES_URL}/${id}/unarchive`,
      {},
      { headers: getHeaders() }
    );
    return res.data;
  } catch (error) {
    console.error("Error unarchiving note:", error);
    return null;
  }
};

export const deleteNote = async (
  id: string
): Promise<DeleteNoteResponse | null> => {
  try {
    const res = await axios.delete(`${BASE_NOTES_URL}/${id}`, {
      headers: getHeaders(),
    });
    return res.data;
  } catch (error) {
    console.error("Error deleting note:", error);
    return null;
  }
};
