import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Document } from "../pages/Playground/Playground";
import socket from "../lib/socket";

interface LevelContextProps {
  children: React.ReactNode;
}

interface Values {
  token: string;
  posts: Document[];
  question: {
    question: string[];
  };
  randomQuestion: string;
}

const LevelContext = createContext<Values>({
  token: "0",
  posts: [],
  question: {
    question: [],
  },
  randomQuestion: "",
});
export const LevelContextProvider: React.FC<LevelContextProps> = ({
  children,
}) => {
  const [token, setToken] = useLocalStorage("interferences-token", "0");
  const [posts, setPosts] = useState<Document[]>([]);
  const [question, setQuestion] = useState<{ question: string[] }>({
    question: [""],
  });

  const randomQuestion =
    question?.question &&
    question?.question[Math.floor(Math.random() * question.question.length)];

  useEffect(() => {
    socket.emit("getPosts", token);
    socket.on("receivePosts", ({ posts: newPosts, question: newQuestion }) => {
      setQuestion(newQuestion);
      setPosts(newPosts);
    });
    socket.on("receiveToken", ({ token, posts, question }) => {
      setToken(token);
      setPosts(posts);
      setQuestion(question);
    });
  }, []);

  return (
    <LevelContext.Provider value={{ token, posts, question, randomQuestion }}>
      {children}
    </LevelContext.Provider>
  );
};

export const useLevelContext = () => useContext(LevelContext);
