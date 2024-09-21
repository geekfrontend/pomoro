import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { setAccessToken, getAccessToken, removeAccessToken } from "../utils";
import { login, getMe, register } from "../services/auth/authService";
import { RegisterRequest, LoginRequest } from "../services/auth/dto";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  registerUser: (data: RegisterRequest) => Promise<void>;
  loginUser: (data: LoginRequest) => Promise<void>;
  fetchUser: () => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = !!user;

  const handleApiError = (err: unknown) => {
    console.error(err);
    setError(
      err instanceof Error ? err.message : "An unexpected error occurred"
    );
    setLoading(false);
  };

  const registerUser = useCallback(async (data: RegisterRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await register({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (response) {
        response.message = "User Created";
        console.log("User created:", response);
      }
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getMe();
      if (response) {
        setUser(response.data);
      }
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    removeAccessToken();
    setLoading(false);
  }, []);

  const loginUser = useCallback(
    async (data: LoginRequest) => {
      setLoading(true);
      setError(null);
      try {
        const response = await login({
          email: data.email,
          password: data.password,
        });
        if (response) {
          response.message = "User logged successfully";
          setAccessToken(response.data.accessToken);
          await fetchUser();
        }
      } catch (err) {
        handleApiError(err);
      }
    },
    [fetchUser]
  );

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [fetchUser]);

  const value: AuthContextType = {
    user,
    isAuthenticated,
    loading,
    error,
    registerUser,
    loginUser,
    fetchUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
