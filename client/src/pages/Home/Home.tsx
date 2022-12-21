import { Button, Container, Typography } from "@mui/material";
import React from "react";
import ReplyIcon from "@mui/icons-material/Reply";

const Home: React.FC = () => {
  return (
    <Container>
      <Typography variant='h1'>Interferences</Typography>

      <Button
        onClick={() => {}}
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
