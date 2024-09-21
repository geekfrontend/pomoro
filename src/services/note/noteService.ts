import { config } from "../../config";
import axios, { AxiosResponse } from "axios";
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

const api = axios.create({
  baseURL: BASE_NOTES_URL,
  headers: getHeaders(),
});

const handleApiError = (error: unknown, operation: string): null => {
  console.error(`Error ${operation}:`, error);
  return null;
};

const makeApiCall = async <T>(
  apiCall: () => Promise<AxiosResponse<T>>,
  operation: string
): Promise<T | null> => {
  try {
    const response = await apiCall();
    return response.data;
  } catch (error) {
    return handleApiError(error, operation);
  }
};

export const createNote = (data: CreateNoteRequest) =>
  makeApiCall<CreateNoteResponse>(() => api.post("", data), "creating note");

export const getNotes = () =>
  makeApiCall<GetNotesResponse>(() => api.get(""), "fetching notes");

export const getArchivedNotes = () =>
  makeApiCall<GetArchivedNotesResponse>(
    () => api.get("/archived"),
    "fetching archived notes"
  );

export const getNoteById = (id: string) =>
  makeApiCall<GetNoteByIdResponse>(
    () => api.get(`/${id}`),
    `fetching note with ID ${id}`
  );

export const archiveNote = (id: string) =>
  makeApiCall<ArchiveNoteResponse>(
    () => api.post(`/${id}/archive`),
    `archiving note with ID ${id}`
  );

export const unarchiveNote = (id: string) =>
  makeApiCall<UnarchiveNoteResponse>(
    () => api.post(`/${id}/unarchive`),
    `unarchiving note with ID ${id}`
  );

export const deleteNote = (id: string) =>
  makeApiCall<DeleteNoteResponse>(
    () => api.delete(`/${id}`),
    `deleting note with ID ${id}`
  );
