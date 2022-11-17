import { Button } from "@mui/material";
import React from "react";
import { useLevelContext } from "../../contexts/LevelProvider";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import socket from "../../socket";
import styles from "./Playground.module.styl";
import { motion } from "framer-motion";

const Card: React.FC<{ card: { source: string } }> = ({ card }) => (
  <motion.div drag dragMomentum={false}>
    <img draggable='false' src={card.source} />
  </motion.div>
);

const Playground: React.FC = () => {
  const { token, posts, randomQuestion } = useLevelContext();
  const sendAnswer = () => {
    socket.emit("sendAnswer", { answer: "c++", token });
  };
  return (
    <div>
      Playground
      <div>
        {posts.map(card => (
          <Card card={card} />
        ))}
        <pre>{JSON.stringify(posts, null, 2)}</pre>

        <pre>{randomQuestion}</pre>
      </div>
      <Button onClick={sendAnswer}>envoyer "epic"</Button>
    </div>
  );
};

export default Playground;
