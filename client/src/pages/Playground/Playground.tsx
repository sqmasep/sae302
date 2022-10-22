import { Button } from "@mui/material";
import React from "react";
import { useLevelContext } from "../../contexts/LevelProvider";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import socket from "../../socket";
import styles from "./Playground.module.styl";

const Card: React.FC<{ card: string }> = props => (
  <div>
    <pre>{JSON.stringify(props, null, 2)}</pre>
  </div>
);

const Playground: React.FC = () => {
  const { data } = useLevelContext();
  const [token] = useLocalStorage("level", "0");
  const sendAnswer = () => {
    socket.emit("sendAnswer", { answer: "epic", token });
  };
  return (
    <div>
      Playground
      <div>
        {data.map(card => (
          <Card card={card} />
        ))}
      </div>
      <Button onClick={sendAnswer}>envoyer "epic"</Button>
    </div>
  );
};

export default Playground;
