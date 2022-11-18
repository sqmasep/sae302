import {
  Button,
  TextField,
  Box,
  Grid,
  Container,
  Typography,
  Stack,
  IconButton,
  Fab,
  SxProps,
  Theme,
} from "@mui/material";
import React from "react";
import { useLevelContext } from "../../contexts/LevelProvider";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import socket from "../../socket";
import styles from "./Playground.module.styl";
import { motion } from "framer-motion";
import { Formik, Form, Field } from "formik";
import { Save } from "@mui/icons-material";

const MotionBox = motion(Box);

const POSITION_CONFIG: SxProps<Theme>[] = [
  {
    transform: "rotateZ(12deg)",
  },
];
const Card: React.FC<{ card: { sourceLowRes: string } }> = ({ card }) => (
  <MotionBox
    whileHover={{ scale: 1.05, rotateZ: 3 }}
    whileTap={{ scale: 0.95 }}
    drag
    dragMomentum={false}
    style={{ transform: "rotateZ(12deg)" }}
    sx={{ position: "relative" }}
  >
    <img draggable='false' src={`/imgs/playground/${card.sourceLowRes}`} />
    <IconButton
      sx={{ position: "absolute", bottom: 0, left: 0 }}
      onClick={e => {}}
    >
      <Save />
    </IconButton>
  </MotionBox>
);

const Playground: React.FC = () => {
  const { token, posts, randomQuestion } = useLevelContext();
  const sendAnswer = (val: { answer: string }) => {
    console.log(val);
    socket.emit("sendAnswer", { answer: val.answer, token });
  };
  return (
    <Container>
      <Fab
        color='primary'
        sx={{ position: "fixed", bottom: 0, right: 0, m: 4 }}
      >
        <Save />
      </Fab>
      <Stack
        alignItems='center'
        justifyContent='space-between'
        flexWrap='wrap'
        spacing={4}
        py={4}
      >
        <Typography variant='h2' component='h1'>
          Ressources
        </Typography>
        <Stack alignItems='center' spacing={4}>
          <Typography fontWeight={900}>{randomQuestion}</Typography>
          <Formik initialValues={{ answer: "" }} onSubmit={sendAnswer}>
            {({ values, errors, isSubmitting, touched }) => {
              return (
                <Form>
                  <Stack alignItems='center' spacing={2}>
                    <Field as={TextField} name='answer' />
                    <Button type='submit'>Répondre</Button>
                  </Stack>
                </Form>
              );
            }}
          </Formik>
        </Stack>
      </Stack>
      <Grid container>
        {posts.map(card => (
          <Grid item xs={12} sm={8} lg={2}>
            <Card card={card} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Playground;
