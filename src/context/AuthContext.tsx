import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { setAccessToken, getAccessToken, removeAccessToken } from "../utils";
import { login, getMe, register } from "../services/auth/authService";
import { RegisterRequest, LoginRequest } from "../services/auth/dto";
import PropTypes from "prop-types";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
  status: string;
}

interface AuthContextType extends AuthState {
  isAuthenticated: boolean;
  registerUser: (data: RegisterRequest) => Promise<void>;
  loginUser: (data: LoginRequest) => Promise<void>;
  fetchUser: () => Promise<void>;
  logout: () => void;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  status: "",
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<AuthState>(initialState);

  const clearMessages = useCallback(() => {
    setTimeout(() => {
      setState((prevState) => ({
        ...prevState,
        isError: false,
        isSuccess: false,
        message: "",
      }));
    }, 3000);
  }, []);

  const registerUser = useCallback(
    async (data: RegisterRequest) => {
      setState((prevState) => ({
        ...prevState,
        isLoading: true,
        isError: false,
        isSuccess: false,
        message: "",
        status: "",
      }));

      try {
        const response = await register(data);
        if (response !== null && response !== undefined) {
          if (response.status === "fail") {
            setState((prevState) => ({
              ...prevState,
              isSuccess: false,
              isError: true,
              status: response.status,
              message: response.message,
            }));
          } else {
            setState((prevState) => ({
              ...prevState,
              isSuccess: true,
              isError: false,
              status: response.status,
              message: response.message,
            }));
          }
        } else {
          setState((prevState) => ({
            ...prevState,
            isError: true,
            message: "Unknown error",
          }));
        }
      } catch (error) {
        setState((prevState) => ({
          ...prevState,
          isError: true,
          message:
            error instanceof Error
              ? error.message
              : "An unexpected error occurred",
        }));
      } finally {
        setState((prevState) => ({ ...prevState, isLoading: false }));
        clearMessages();
      }
    },
    [clearMessages]
  );

  const fetchUser = useCallback(async () => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
      isError: false,
      isSuccess: false,
      message: "",
    }));

    try {
      const token = getAccessToken();
      if (!token) return;
      const response = await getMe();
      if (response) {
        setState((prevState) => ({
          ...prevState,
          token: token,
          user: response.data,
          isSuccess: true,
          message: response.message,
        }));
      }
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        isError: true,
        message:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      }));
    } finally {
      setState((prevState) => ({ ...prevState, isLoading: false }));
      clearMessages();
    }
  }, [clearMessages]);

  const loginUser = useCallback(
    async (data: LoginRequest) => {
      setState((prevState) => ({
        ...prevState,
        isLoading: true,
        isError: false,
        isSuccess: false,
        message: "",
      }));

      try {
        const response = await login(data);
        if (response?.status === "fail") {
          setState((prevState) => ({
            ...prevState,
            isSuccess: false,
            status: "fail",
            isError: true,
            message: response.message,
          }));
        } else if (response?.data) {
          if (response.data.accessToken) {
            setState((prevState) => ({
              ...prevState,
              token: response.data.accessToken,
            }));
            setAccessToken(response.data.accessToken);
          }
          await fetchUser();
          setState((prevState) => ({
            ...prevState,
            status: "success",
            isError: false,
            isSuccess: true,
            message: response.message,
          }));
        }
      } catch (error) {
        setState((prevState) => ({
          ...prevState,
          isError: true,
          message:
            error instanceof Error
              ? error.message
              : "An unexpected error occurred",
        }));
      } finally {
        setState((prevState) => ({ ...prevState, isLoading: false }));
        clearMessages();
      }
    },
    [fetchUser, clearMessages]
  );

  const logout = useCallback(() => {
    setState({ ...initialState, message: "Logged out successfully" });
    removeAccessToken();
    clearMessages();
  }, [clearMessages]);

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      setState((prevState) => ({
        ...prevState,
        token,
      }));
      fetchUser();
    } else {
      setState((prevState) => ({ ...prevState, isLoading: false }));
    }
  }, [fetchUser]);

  const contextValue = useMemo<AuthContextType>(
    () => ({
      ...state,
      isAuthenticated: !!state.user,
      registerUser,
      loginUser,
      fetchUser,
      logout,
    }),
    [state, registerUser, loginUser, fetchUser, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
