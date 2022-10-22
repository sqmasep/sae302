import { Button, Container, Typography } from "@mui/material";
import React from "react";
import ReplyIcon from "@mui/icons-material/Reply";
import socket from "../../socket";

const Home: React.FC = () => {
  return (
    <Container>
      <Typography>yo</Typography>
      <Button
        onClick={() => {
          socket.emit("sendAnswer", { answer: "wow!" });
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
