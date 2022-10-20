import React, { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface LevelContextProps {
  children: React.ReactNode;
}

const LevelContext = createContext(null);
export const LevelContextProvider: React.FC<LevelContextProps> = ({
  children,
}) => {
  const level = useLocalStorage("level");
  return <LevelContext.Provider value={null}>{children}</LevelContext.Provider>;
};

export const useLevelContext = () => useContext(LevelContext);
