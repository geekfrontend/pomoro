export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  status: string;
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: string;
  message: string;
  data: {
    accessToken: string;
  };
}

export interface GetMeResponse {
  status: string;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
  };
}
