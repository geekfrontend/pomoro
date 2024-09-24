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
import { getHeadersWIthToken } from "../../services/utils";

const BASE_NOTES_URL = `${config.BASE_URL}/notes`;

const api = axios.create({
  baseURL: BASE_NOTES_URL,
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

export const createNote = (data: CreateNoteRequest, token: string) =>
  makeApiCall<CreateNoteResponse>(
    () => api.post("", data, { headers: getHeadersWIthToken(token) }),
    "creating note"
  );

export const getNotes = (token: string) =>
  makeApiCall<GetNotesResponse>(
    () => api.get("", { headers: getHeadersWIthToken(token) }),
    "fetching notes"
  );

export const getArchivedNotes = (token: string) =>
  makeApiCall<GetArchivedNotesResponse>(
    () => api.get("/archived", { headers: getHeadersWIthToken(token) }),
    "fetching archived notes"
  );

export const getNoteById = (id: string, token: string) =>
  makeApiCall<GetNoteByIdResponse>(
    () => api.get(`/${id}`, { headers: getHeadersWIthToken(token) }),
    `fetching note with ID ${id}`
  );

export const archiveNote = (id: string, token: string) =>
  makeApiCall<ArchiveNoteResponse>(
    () =>
      api.post(`/${id}/archive`, {}, { headers: getHeadersWIthToken(token) }),
    `archiving note with ID ${id}`
  );

export const unarchiveNote = (id: string, token: string) =>
  makeApiCall<UnarchiveNoteResponse>(
    () =>
      api.post(`/${id}/unarchive`, {}, { headers: getHeadersWIthToken(token) }),
    `unarchiving note with ID ${id}`
  );

export const deleteNote = (id: string, token: string) =>
  makeApiCall<DeleteNoteResponse>(
    () => api.delete(`/${id}`, { headers: getHeadersWIthToken(token) }),
    `deleting note with ID ${id}`
  );
