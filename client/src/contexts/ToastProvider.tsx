import React, { useContext, createContext, useState } from "react";

const ToastContext = createContext(null);

interface ToastProviderInterface {
  children: React.ReactNode;
}

const ToastProvider: React.FC<ToastProviderInterface> = ({ children }) => {
  const toast = () => {};

  return <ToastContext.Provider value={{}}>{children}</ToastContext.Provider>;
};

export default ToastProvider;
export const useToast = () => useContext(ToastContext);
