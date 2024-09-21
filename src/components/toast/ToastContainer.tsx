import React from "react";
import Toast from ".";
import { ToastType } from "../../context/ToastContext";

interface ToastContainerProps {
  toasts: {
    id: string;
    message: string;
    type: ToastType;
  }[];
  removeToast: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  removeToast,
}: ToastContainerProps) => {
  return (
    <div className="fixed top-0 p-4 transform -translate-x-1/2 left-1/2 z-99">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
          removeToast={removeToast}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
