import { Button, Stack, styled, TextField, Typography } from "@mui/material";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import { useLevelContext } from "../../contexts/LevelProvider";
import socket from "../../lib/socket";
import MovieName from "../MovieName/MovieName";
import SfxSwitch from "../SfxSwitch/SfxSwitch";

interface AnswerInterface {
  answer: string;
}

const StyledLink = styled(Link)(() => ({
  textDecoration: "none",
  color: "inherit",
}));

const PlaygroundHeader: React.FC = () => {
  const { token, randomQuestion, win } = useLevelContext();

  const sendAnswer = (
    val: AnswerInterface,
    { resetForm }: FormikHelpers<AnswerInterface>
  ) => {
    val.answer.trim().length &&
      socket.emit("sendAnswer", { answer: val.answer, token });
    resetForm();
  };

  return (
    <Stack
      alignItems='center'
      justifyContent='space-between'
      flexWrap='wrap'
      gap={4}
      sx={{ py: 2 }}
    >
      <LayoutGroup>
        <Stack alignItems='center' gap={4} flexWrap='wrap'>
          <StyledLink to='/'>
            <MovieName />
          </StyledLink>
        </Stack>
        <SfxSwitch layout />

        {!win && (
          <Stack alignItems='center' gap={2} flexWrap='wrap'>
            <AnimatePresence mode='wait'>
              {randomQuestion && (
                <motion.div
                  layout
                  key={randomQuestion}
                  initial={{
                    opacity: 0,
                    y: 100,
                    scale: 0.9,
                  }}
                  animate={{
                    opacity: [0, 0.75, 1],
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
        )}
      </LayoutGroup>
    </Stack>
  );
};

export default PlaygroundHeader;
