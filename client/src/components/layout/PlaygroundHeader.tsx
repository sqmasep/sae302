import { Button, Stack, TextField, Typography } from "@mui/material";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useLevelContext } from "../../contexts/LevelProvider";
import socket from "../../lib/socket";

interface AnswerInterface {
  answer: string;
}

const PlaygroundHeader: React.FC = () => {
  const { token, randomQuestion } = useLevelContext();

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
    </Stack>
  );
};

export default PlaygroundHeader;
