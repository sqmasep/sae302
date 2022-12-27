import {
  Button,
  TextField,
  Container,
  Typography,
  Stack,
  Snackbar,
  Alert,
  Slide,
} from "@mui/material";
import React, { useState } from "react";
import { useLevelContext } from "../../contexts/LevelProvider";
import socket from "../../lib/socket";
import { Formik, Form, Field, FormikHelpers } from "formik";
import SavePosts from "../../components/layout/SavePosts";
import SavedDocumentsProvider from "../../contexts/SavedDocumentsProvider";
import PlaygroundPosts from "../../components/layout/PlaygroundPosts";
import { AnimatePresence, motion } from "framer-motion";

export interface Document {
  _id: string;
  sourceLowRes: string;
  sourceHighRes: string;
  idQuestions: string[];
}

interface AnswerInterface {
  answer: string;
}

interface SnackbarInterface {
  msg?: string;
  isOpen: boolean;
}

const Playground: React.FC = () => {
  const { token, randomQuestion } = useLevelContext();
  const [{ msg, isOpen }, setSnackbar] = useState<SnackbarInterface>({
    isOpen: false,
  });

  const sendAnswer = (
    val: AnswerInterface,
    { resetForm }: FormikHelpers<AnswerInterface>
  ) => {
    val.answer.trim().length &&
      socket.emit("sendAnswer", { answer: val.answer, token });
    resetForm();
  };

  socket.on("error", msg => setSnackbar({ msg, isOpen: true }));
  socket.on("win", () => console.log("you win!"));

  const handleClose = () => {
    setSnackbar(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={isOpen}
        TransitionComponent={Slide}
        onClose={handleClose}
        autoHideDuration={6000}
      >
        <Alert onClose={handleClose} severity='error'>
          {msg}
        </Alert>
      </Snackbar>
      <Container>
        <Stack
          alignItems='center'
          justifyContent='space-between'
          flexWrap='wrap'
          spacing={4}
        >
          <Typography variant='h2' component='h1'>
            RESSOURCES
          </Typography>
          <Stack alignItems='center' gap={4}>
            <AnimatePresence mode='wait'>
              {randomQuestion && (
                <motion.div
                  key={randomQuestion}
                  initial={{
                    opacity: 0,
                    y: 100,
                    scale: 0.9,
                  }}
                  animate={{
                    opacity: [0, 1, 1],
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.5 },
                  }}
                  exit={{
                    opacity: 0,
                    y: -100,
                    scale: 0.9,
                    transition: { duration: 0.3 },
                  }}
                >
                  <Typography fontWeight={900}>{randomQuestion}</Typography>
                </motion.div>
              )}
            </AnimatePresence>
            <Formik initialValues={{ answer: "" }} onSubmit={sendAnswer}>
              {() => {
                return (
                  <Form>
                    <Stack alignItems='center' spacing={2}>
                      <Field as={TextField} name='answer' size='small' />
                      <Button type='submit'>Répondre</Button>
                    </Stack>
                  </Form>
                );
              }}
            </Formik>
          </Stack>
        </Stack>
        <SavedDocumentsProvider>
          <SavePosts />
          <PlaygroundPosts />
        </SavedDocumentsProvider>
      </Container>
    </>
  );
};

export default Playground;
