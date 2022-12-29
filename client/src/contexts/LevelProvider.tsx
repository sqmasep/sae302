import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Document } from "../pages/Playground/Playground";
import socket from "../lib/socket";

interface LevelContextProps {
  children: React.ReactNode;
}

interface Values {
  token: string;
  reset: () => void;
  posts: Document[];
  isLoading: boolean;
  question: {
    question: string[];
  };
  randomQuestion: string;
  win: boolean;
}

const LevelContext = createContext<Values>({
  token: "0",
  reset: () => {},
  posts: [],
  isLoading: true,
  question: {
    question: [],
  },
  randomQuestion: "",
  win: false,
});
export const LevelContextProvider: React.FC<LevelContextProps> = ({
  children,
}) => {
  const [token, setToken] = useLocalStorage("interferences-token", "0");
  const [posts, setPosts] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [question, setQuestion] = useState<{ question: string[] }>({
    question: [""],
  });
  const [win, setWin] = useState(false);

  const resetToken = () => setToken("0");
  const getPosts = (a?: string) => socket.emit("getPosts", a ?? token);

  const reset = useCallback(() => {
    setIsLoading(true);
    setWin(false);
    setPosts([]);
    setQuestion({ question: [""] });
    getPosts("0");
    resetToken();
  }, [token]);

  const randomQuestion =
    question?.question &&
    question?.question[Math.floor(Math.random() * question.question.length)];

  useEffect(() => {
    getPosts();

    socket.on("receivePosts", ({ posts: newPosts, question: newQuestion }) => {
      setQuestion(newQuestion);
      setPosts(newPosts);
      setIsLoading(false);
    });

    socket.on("receiveToken", ({ token, posts, question }) => {
      setToken(token);
      setPosts(posts);
      setQuestion(question);
    });

    socket.on("win", token => {
      setWin(true);
      setIsLoading(false);
      token && setToken(token);
    });
  }, []);

  return (
    <LevelContext.Provider
      value={{
        token,
        reset,
        posts,
        isLoading,
        question,
        randomQuestion,
        win,
      }}
    >
      {children}
    </LevelContext.Provider>
  );
};

export const useLevelContext = () => useContext(LevelContext);
