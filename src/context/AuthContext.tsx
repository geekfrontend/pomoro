import { createContext, useState, useContext, ReactNode } from "react";

// Define your interfaces as needed
interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface GetMeResponse {
  id: string;
  email: string;
  name: string;
}

interface LoginResponse {
  user: GetMeResponse;
  token: string;
}

interface RegisterResponse {
  user: GetMeResponse;
  token: string;
}

interface AuthContextType {
  user: GetMeResponse | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  registerUser: (data: RegisterRequest) => void;
  loginUser: (data: LoginRequest) => void;
  fetchUser: () => void;
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
    console.log(data);
    // Simulate API call
    try {
      // Replace with actual register logic
      const response: RegisterResponse = {
        user: {
          id: "1",
          email: "geekfrontend@gmail.com",
          name: "GeekFrontend",
        },
        token: "dummyToken",
      };
      setUser(response.user);
    } catch (err) {
      console.error(err);
      setError("Failed to register");
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (data: LoginRequest) => {
    setLoading(true);
    setError(null);
    console.log(data);
    // Simulate API call
    try {
      // Replace with actual login logic
      const response: LoginResponse = {
        user: {
          id: "1",
          email: "geekfrontend@gmail.com",
          name: "GeekFrontend",
        },
        token: "dummyToken",
      };
      setUser(response.user);
    } catch (err) {
      console.error(err);
      setError("Failed to login");
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    setLoading(true);
    setError(null);
    // Simulate API call
    try {
      // Replace with actual fetch user logic
      const response: GetMeResponse = {
        id: "1",
        email: "geekfrontend@gmail.com",
        name: "GeekFrontend",
      };
      setUser(response);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch user");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
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
