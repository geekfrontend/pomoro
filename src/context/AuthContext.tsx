import { createContext, useState, useContext, ReactNode } from "react";
import {
  RegisterRequest,
  LoginRequest,
  GetMeResponse,
  LoginResponse,
  RegisterResponse,
} from "../services/auth/dto";
import { register, login, getMe } from "../services/auth/authService";

interface AuthContextType {
  user: GetMeResponse | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  registerUser: (data: RegisterRequest) => Promise<RegisterResponse | null>;
  loginUser: (data: LoginRequest) => Promise<LoginResponse | null>;
  fetchUser: () => Promise<GetMeResponse | null>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<GetMeResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = !!user;

  const registerUser = async (data: RegisterRequest) => {
    setLoading(true);
    setError(null);
    const response = await register(data);
    if (response) {
      setUser(response.user);
    } else {
      setError("Failed to register");
    }
    setLoading(false);
    return response;
  };

  const loginUser = async (data: LoginRequest) => {
    setLoading(true);
    setError(null);
    const response = await login(data);
    if (response) {
      setUser(response.data);
    } else {
      setError("Failed to login");
    }
    setLoading(false);
    return response;
  };

  const fetchUser = async () => {
    setLoading(true);
    const response = await getMe();
    if (response) {
      setUser(response);
    } else {
      setError("Failed to fetch user details");
    }
    setLoading(false);
    return response;
  };

  const logout = () => {
    setUser(null);
    // Optionally clear tokens here
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        registerUser,
        loginUser,
        fetchUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
