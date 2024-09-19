import { config } from "../../config";
import axios from "axios";
import {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
  GetMeResponse,
} from "./dto";
import { getHeaders } from "../utils";

export const register = async ({
  name,
  email,
  password,
}: RegisterRequest): Promise<RegisterResponse | null> => {
  try {
    const res = await axios.post(`${config.BASE_URL}/auth/register`, {
      name,
      email,
      password,
    });
    return res.data;
  } catch (error) {
    console.error("Failed to register:", error);
    return null;
  }
};

export const login = async ({
  email,
  password,
}: LoginRequest): Promise<LoginResponse | null> => {
  try {
    const res = await axios.post(`${config.BASE_URL}/auth/login`, {
      email,
      password,
    });
    return res.data;
  } catch (error) {
    console.error("Failed to login:", error);
    return null;
  }
};

export const getMe = async (): Promise<GetMeResponse | null> => {
  try {
    const res = await axios.get(`${config.BASE_URL}/users/me`, {
      headers: getHeaders(),
    });
    return res.data;
  } catch (error) {
    console.error("Failed to fetch user details:", error);
    return null;
  }
};
