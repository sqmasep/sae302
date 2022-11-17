import { Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import ReplyIcon from "@mui/icons-material/Reply";
import socket from "../../socket";
import { useLevelContext } from "../../contexts/LevelProvider";

const Home: React.FC = () => {
  const { token } = useLevelContext();

  const [answer, setAnswer] = useState("");

  return (
    <Container>
      <Typography variant='h1'>Interferences</Typography>

      <TextField onChange={e => setAnswer(e.target.value)} />
      <Button
        onClick={() => {
          socket.emit("sendAnswer", { answer, token });
        }}
        startIcon={<ReplyIcon />}
        variant='contained'
        size='large'
      >
        voir le film
      </Button>
    </Container>
  );
};

export default Home;
