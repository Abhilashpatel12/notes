import * as React from "react";
import type { ReactNode } from "react";

// Simple toast types for compatibility
export interface ToastProps {
  children?: ReactNode;
  className?: string;
}

// Simple toast components without radix-ui dependencies
const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

const ToastViewport: React.FC<ToastProps> = ({ children, className }) => {
  return (
    <div className={`fixed top-4 right-4 z-50 max-w-md ${className || ""}`}>
      {children}
    </div>
  );
};

const Toast: React.FC<ToastProps> = ({ children, className }) => {
  return (
    <div className={`bg-white border rounded-lg shadow-lg p-4 ${className || ""}`}>
      {children}
    </div>
  );
};

const ToastAction: React.FC<ToastProps> = ({ children, className }) => {
  return (
    <button className={`text-blue-600 hover:text-blue-800 ${className || ""}`}>
      {children}
    </button>
  );
};

const ToastClose: React.FC<ToastProps> = ({ children, className }) => {
  return (
    <button className={`text-gray-400 hover:text-gray-600 ${className || ""}`}>
      {children || "×"}
    </button>
  );
};

const ToastTitle: React.FC<ToastProps> = ({ children, className }) => {
  return (
    <div className={`font-semibold ${className || ""}`}>
      {children}
    </div>
  );
};

const ToastDescription: React.FC<ToastProps> = ({ children, className }) => {
  return (
    <div className={`text-sm text-gray-600 ${className || ""}`}>
      {children}
    </div>
  );
};

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
