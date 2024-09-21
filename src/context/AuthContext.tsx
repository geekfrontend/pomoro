import React, { createContext, useState, useEffect, useCallback } from "react";
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

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleApiError = (err: unknown) => {
    console.error(err);
    setError(
      err instanceof Error ? err.message : "An unexpected error occurred"
    );
    setLoading(false);
  };

  const executeAuthOperation = async (operation: () => Promise<void>) => {
    setLoading(true);
    setError(null);
    try {
      await operation();
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  };

  const registerUser = useCallback(async (data: RegisterRequest) => {
    await executeAuthOperation(async () => {
      const response = await register(data);
      if (response) {
        console.log(response);
      }
    });
  }, []);

  const fetchUser = useCallback(async () => {
    await executeAuthOperation(async () => {
      const response = await getMe();
      if (response) {
        setUser(response.data);
      }
    });
  }, []);

  const loginUser = useCallback(
    async (data: LoginRequest) => {
      await executeAuthOperation(async () => {
        const response = await login(data);
        if (response) {
          setAccessToken(response.data.accessToken);
          await fetchUser();
        }
      });
    },
    [fetchUser]
  );

  const logout = useCallback(() => {
    setUser(null);
    removeAccessToken();
    setLoading(false);
  }, []);

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [fetchUser]);

  const contextValue: AuthContextType = {
    user,
    isAuthenticated: !!user,
    loading,
    error,
    registerUser,
    loginUser,
    fetchUser,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
