import React, { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import socket from "../socket";

interface LevelContextProps {
  children: React.ReactNode;
}

const LevelContext = createContext<{ data: string[] }>({
  data: ["jar", "slt"],
});
export const LevelContextProvider: React.FC<LevelContextProps> = ({
  children,
}) => {
  const [level, setLevel] = useLocalStorage("level", "0");
  useEffect(() => {
    socket.emit("getPosts", { token: level });
    socket.on("receivePosts", data => {
      console.log("received posts!");
    });
  }, []);

  return (
    <LevelContext.Provider value={{ data: [""] }}>
      {children}
    </LevelContext.Provider>
  );
};

export const useLevelContext = () => useContext(LevelContext);
