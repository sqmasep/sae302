import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import Confetti from "react-confetti";
import { useLevelContext } from "../../contexts/LevelProvider";

const WinScreen: React.FC = () => {
  const { reset } = useLevelContext();

  return (
    <>
      <Confetti width={innerWidth} height={innerHeight} />

      <Stack direction='column' gap={2} alignItems='center' mt={24}>
        <Typography variant='h1'>et zé gagné!</Typography>
        <Button onClick={reset} size='large'>
          Je recommence !
        </Button>
      </Stack>
    </>
  );
};

export default WinScreen;
