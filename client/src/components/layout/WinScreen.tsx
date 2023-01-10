import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useLevelContext } from "../../contexts/LevelProvider";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import socket from "../../lib/socket";
import Player from "react-player";

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

  const [openDialog, setOpenDialog] = useState(false);

  const handleSendNickname = (
    { nickname }: Nickname,
    { resetForm, setErrors }: FormikHelpers<Nickname>
  ) => {
    nickname.length === 0
      ? setErrors({ nickname: "Veuillez renseigner un pseudo valide" })
      : socket.emit("sendNickname", { token, nickname });
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
      <Confetti
        width={innerWidth}
        height={innerHeight}
        style={{ zIndex: -1 }}
      />
      <Container>
        <MotionStack
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          direction='column'
          gap={2}
          mt={24}
        >
          <Typography variant='h1'>et zé gagné!</Typography>
          {isFirstWinner && (
            <Typography variant='subtitle1' component='h2'>
              Tu es le premier à avoir gagné ! Contacte les organisateurs
            </Typography>
          )}
          {!alreadyInLeaderboard && (
            <Formik
              initialValues={{ nickname: "" }}
              onSubmit={handleSendNickname}
            >
              {({ errors, handleSubmit }) => (
                <Stack alignItems='center' gap={2}>
                  <Field name='nickname' as={TextField} label='Ton pseudo' />
                  {errors.nickname && <ErrorMessage name='nickname' />}
                  <Button onClick={() => handleSubmit()}>
                    Définir mon pseudo
                  </Button>
                </Stack>
              )}
            </Formik>
          )}

          <Box my={12} sx={{ minHeight: "100rem" }}>
            <Typography variant='h4' component='h2' sx={{ mb: 4 }}>
              Tu peux voir la vraie fin du court-métrage
            </Typography>

            {/* <video
              src='/vids/trailer.mp4'
              controls
              width='100%'
              height='auto'
              style={{
                borderRadius: "1rem",
                boxShadow: "0 2em 4em 1em rgba(0, 0, 0, 0.3)",
              }}
            /> */}
            <Player
              pip
              width='100%'
              height='auto'
              style={{ aspectRatio: "16/9" }}
              controls
              url='https://youtu.be/esPmkiH8iNs'
            />

            <Button
              sx={{ mt: 4 }}
              onClick={() => setOpenDialog(true)}
              size='large'
            >
              Je recommence les recherches ! 🧐🕵️‍♀️
            </Button>

            <Dialog open={openDialog}>
              <DialogTitle>Recommencer les recherches ?</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Tu vas perdre tous tes progrès et recommencer le jeu depuis le
                  début, es-tu sûr de vouloir recommencer ?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button variant='outlined' onClick={() => setOpenDialog(false)}>
                  Annuler
                </Button>
                <Button onClick={reset}>Oui ! je recommence</Button>
              </DialogActions>
            </Dialog>
          </Box>
        </MotionStack>
      </Container>
    </>
  );
};

export default WinScreen;
