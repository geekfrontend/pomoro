export interface CreateNoteRequest {
  title: string;
  body: string;
}

export interface CreateNoteResponse {
  status: string;
  message: string;
  data?: {
    id: string;
    title: string;
    body: string;
    owner: string;
    archived: boolean;
    createdAt: string;
  };
}

export interface GetNotesResponse {
  status: string;
  message: string;
  data?: {
    id: string;
    title: string;
    body: string;
    owner: string;
    archived: boolean;
    createdAt: string;
  }[];
}

export interface GetArchivedNotesResponse {
  status: string;
  message: string;
  data?: {
    id: string;
    title: string;
    body: string;
    owner: string;
    archived: boolean;
    createdAt: string;
  }[];
}

export interface GetNoteByIdResponse {
  status: string;
  message: string;
  data?: {
    id: string;
    title: string;
    body: string;
    owner: string;
    archived: boolean;
    createdAt: string;
  };
}

export interface ArchiveNoteResponse {
  status: string;
  message: string;
}

export interface UnarchiveNoteResponse {
  status: string;
  message: string;
}

export interface DeleteNoteResponse {
  status: string;
  message: string;
}
