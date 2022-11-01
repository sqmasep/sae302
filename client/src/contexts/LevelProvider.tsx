import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import socket from "../socket";

interface LevelContextProps {
  children: React.ReactNode;
}

interface Values {
  token: string;
  posts: any[];
  question: string[];
}

const LevelContext = createContext<Values>({
  token: "0",
  posts: [],
  question: [],
});
export const LevelContextProvider: React.FC<LevelContextProps> = ({
  children,
}) => {
  const [token, setToken] = useLocalStorage("token", "0");
  const [posts, setPosts] = useState<any[]>([]);
  const [question, setQuestion] = useState<string[]>([""]);

  useEffect(() => {
    socket.on("getPosts", posts => setPosts(posts));
    socket.on("receiveToken", ({ token, posts, question }) => {
      setToken(token);
      setPosts(posts);
      setQuestion(question);
    });
  }, []);

  return (
    <LevelContext.Provider value={{ token, posts, question }}>
      {children}
      <pre>{JSON.stringify(token, null, 2)}</pre>
      <pre>{JSON.stringify(posts, null, 2)}</pre>
      <pre>{JSON.stringify(question, null, 2)}</pre>
    </LevelContext.Provider>
  );
};

export const useLevelContext = () => useContext(LevelContext);
