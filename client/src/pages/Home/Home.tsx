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
      <Typography>yo</Typography>
      <TextField onChange={e => setAnswer(e.target.value)} />
      <Button
        onClick={() => {
          socket.emit("sendAnswer", { answer, token });
        }}
        startIcon={<ReplyIcon />}
        variant='contained'
        size='large'
      >
        hello
      </Button>
    </Container>
  );
};

export default Home;
