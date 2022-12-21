import {
  Button,
  TextField,
  Grid,
  Container,
  Typography,
  Stack,
} from "@mui/material";
import React from "react";
import { useLevelContext } from "../../contexts/LevelProvider";
import socket from "../../socket";
import { Formik, Form, Field } from "formik";
import SavePosts from "../../components/layout/SavePosts";
import SavedDocumentsProvider from "../../contexts/SavedDocumentsProvider";
import Card from "../../components/Card/Card";
import { usePreview } from "../../contexts/PreviewProvider";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";

export interface Document {
  _id: string;
  sourceLowRes: string;
  sourceHighRes: string;
  idQuestions: string[];
}
const Playground: React.FC = () => {
  const { token, posts, randomQuestion } = useLevelContext();
  const sendAnswer = (val: { answer: string }, { resetForm }) => {
    console.log(val);
    socket.emit("sendAnswer", { answer: val.answer, token });
    resetForm();
  };

  const { setSelectedDocument, selectedDocument } = usePreview();

  return (
    <SavedDocumentsProvider>
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
        <AnimateSharedLayout>
          <Grid container>
            {posts.map(card => (
              <motion.div key={card._id} layout layoutId={card._id}>
                <Grid
                  key={card._id}
                  item
                  xs={12}
                  sm={8}
                  lg={2}
                  onClick={() => setSelectedDocument(card)}
                >
                  <Card card={card} />
                </Grid>
              </motion.div>
            ))}

            <AnimatePresence>
              {selectedDocument && (
                <div
                  onClick={() => setSelectedDocument(null)}
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(0,0,0,0.5)",
                    zIndex: 100,
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      position: "absolute",
                      inset: 0,
                    }}
                  >
                    <motion.img
                      layout
                      layoutId={selectedDocument?._id}
                      style={{
                        maxHeight: "100vh",
                        maxWidth: "100vw",
                        objectFit: "contain",
                        margin: "auto",
                      }}
                      src={`/imgs/playground/${selectedDocument.sourceHighRes}`}
                    />
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </Grid>
        </AnimateSharedLayout>
      </Container>
    </SavedDocumentsProvider>
  );
};

export default Playground;
