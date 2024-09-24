import { createContext, useReducer, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import ToastContainer from "../components/toast/ToastContainer";
import PropTypes from "prop-types";

export type ToastType = "success" | "info" | "error";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastState {
  toasts: Toast[];
}

type ToastAction =
  | { type: "ADD_TOAST"; payload: Omit<Toast, "id"> }
  | { type: "REMOVE_TOAST"; payload: string };

const initialState: ToastState = {
  toasts: [],
};

export const ToastContext = createContext<ToastContextType | null>(null);

const toastReducer = (state: ToastState, action: ToastAction): ToastState => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [{ ...action.payload, id: uuidv4() }, ...state.toasts],
      };
    case "REMOVE_TOAST":
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.payload),
      };
    default:
      return state;
  }
};

export interface ToastContextType {
  success: (message: string) => void;
  info: (message: string) => void;
  error: (message: string) => void;
  removeToast: (id: string) => void;
}

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  const addToast = (type: ToastType, message: string) => {
    dispatch({ type: "ADD_TOAST", payload: { type, message } });
  };

  const removeToast = (id: string) => {
    dispatch({ type: "REMOVE_TOAST", payload: id });
  };

  const toastMethods: ToastContextType = {
    success: (message: string) => addToast("success", message),
    info: (message: string) => addToast("info", message),
    error: (message: string) => addToast("error", message),
    removeToast,
  };

  return (
    <ToastContext.Provider value={toastMethods}>
      {children}
      <ToastContainer toasts={state.toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}
