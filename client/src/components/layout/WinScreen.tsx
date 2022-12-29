import { Button, Stack, TextField, Typography } from "@mui/material";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useLevelContext } from "../../contexts/LevelProvider";
import socket from "../../lib/socket";

const MotionStack = motion(Stack);

interface Nickname {
  nickname: string;
}

const WinScreen: React.FC = () => {
  const { reset, token } = useLevelContext();
  const [isFirstWinner, setIsFirstWinner] = useState(false);
  const [alreadyInLeaderboard, setAlreadyInLeaderboard] = useState(false);

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

    socket.on("firstWinner", ({ isFirstWinner }) => {
      setIsFirstWinner(isFirstWinner);
      console.log("first winner !");
    });
  }, []);

  return (
    <>
      <Confetti width={innerWidth} height={innerHeight} />

      <MotionStack
        initial={{}}
        animate={{}}
        exit={{}}
        direction='column'
        gap={2}
        alignItems='center'
        mt={24}
      >
        <Typography variant='h1'>et zé gagné!</Typography>
        {isFirstWinner && (
          <Typography variant='h2'>
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
