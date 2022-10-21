import React, { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface LevelContextProps {
  children: React.ReactNode;
}

const LevelContext = createContext<{ data: string[] }>({
  data: ["jar", "slt"],
});
export const LevelContextProvider: React.FC<LevelContextProps> = ({
  children,
}) => {
  const [level, setLevel] = useLocalStorage("level", "");
  return (
    <LevelContext.Provider value={{ data: [""] }}>
      {children}
    </LevelContext.Provider>
  );
};

export const useLevelContext = () => useContext(LevelContext);
