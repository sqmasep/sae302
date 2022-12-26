import {
  Button,
  TextField,
  Container,
  Typography,
  Stack,
  Snackbar,
} from "@mui/material";
import React, { useState } from "react";
import { useLevelContext } from "../../contexts/LevelProvider";
import socket from "../../socket";
import { Formik, Form, Field } from "formik";
import SavePosts from "../../components/layout/SavePosts";
import SavedDocumentsProvider from "../../contexts/SavedDocumentsProvider";
import PlaygroundPosts from "../../components/layout/PlaygroundPosts";

export interface Document {
  _id: string;
  sourceLowRes: string;
  sourceHighRes: string;
  idQuestions: string[];
}
const Playground: React.FC = () => {
  const { token, randomQuestion } = useLevelContext();
  const [error, setError] = useState<string | null>(null);
  const sendAnswer = (val: { answer: string }, { resetForm }) => {
    console.log(val);
    socket.emit("sendAnswer", { answer: val.answer, token });
    resetForm();
  };

  socket.on("error", err => setError(err));
  socket.on("win", () => console.log("you win!"));

  return (
    <SavedDocumentsProvider>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={error}
        // onClose={handleClose}
        message={error}
        color='error'
      />
      <Container>
        <SavePosts />
        <Stack
          alignItems='center'
          justifyContent='space-between'
          flexWrap='wrap'
          spacing={4}
        >
          <Typography variant='h2' component='h1'>
            Ressources
          </Typography>
          <Stack alignItems='center' spacing={4}>
            <Typography fontWeight={900}>{randomQuestion}</Typography>
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

        <PlaygroundPosts />
      </Container>
    </SavedDocumentsProvider>
  );
};

export default Playground;
