import { Button, Stack, TextField, Typography } from "@mui/material";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useLevelContext } from "../../contexts/LevelProvider";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import socket from "../../lib/socket";

const MotionStack = motion(Stack);

interface Nickname {
  nickname: string;
}

const WinScreen: React.FC = () => {
  const { reset, token } = useLevelContext();
  const [isFirstWinner, setIsFirstWinner] = useState(false);
  const [alreadyInLeaderboard, setAlreadyInLeaderboard] = useState(false);
  const [winnerToken, setWinnerToken] = useLocalStorage(
    "interferences-winner-token",
    false
  );

  const handleSendNickname = (
    { nickname }: Nickname,
    { resetForm }: FormikHelpers<Nickname>
  ) => {
    socket.emit("sendNickname", { token, nickname });
    resetForm();
  };

  useEffect(() => {
    socket.emit("win", { token });
    socket.on("alreadyInLeaderboard", () => {
      setAlreadyInLeaderboard(true);
    });

    socket.on("firstWinner", ({ isFirstWinner, winnerToken }) => {
      setIsFirstWinner(isFirstWinner);
      setWinnerToken(winnerToken);
    });
  }, []);

  return (
    <>
      <Confetti width={innerWidth} height={innerHeight} />

      <MotionStack
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        direction='column'
        gap={2}
        alignItems='center'
        mt={24}
      >
        <Typography variant='h1'>et zé gagné!</Typography>
        {isFirstWinner && (
          <Typography variant='subtitle1' component='h2' textAlign='center'>
            Tu es le premier à avoir gagné ! Contacte les organisateurs
          </Typography>
        )}
        {!alreadyInLeaderboard && (
          <Formik
            initialValues={{ nickname: "" }}
            onSubmit={handleSendNickname}
          >
            <Form>
              <Field name='nickname' as={TextField} label='Ton pseudo' />
            </Form>
          </Formik>
        )}
        <Button onClick={reset} size='large'>
          Je recommence !
        </Button>
      </MotionStack>
    </>
  );
};

export default WinScreen;
