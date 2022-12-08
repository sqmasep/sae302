import {
  Button,
  TextField,
  Box,
  Grid,
  Container,
  Typography,
  Stack,
  Checkbox,
} from "@mui/material";
import React, { useState } from "react";
import { useLevelContext } from "../../contexts/LevelProvider";
import socket from "../../socket";
import { motion } from "framer-motion";
import { Formik, Form, Field } from "formik";
import { Save, TurnedIn, TurnedInNot } from "@mui/icons-material";
import SavePosts from "../../components/layout/SavePosts";
import SavedDocumentsProvider, {
  useSavedDocuments,
} from "../../contexts/SavedDocumentsProvider";

const MotionBox = motion(Box);

const Card: React.FC<{ card: { id: string; sourceLowRes: string } }> = ({
  card,
}) => {
  const {
    documents: savedDocuments,
    pushUnique,
    remove,
    inArray,
  } = useSavedDocuments();
  const [hover, setHover] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    checked ? pushUnique(e.target.value) : remove(e.target.value);
  };

  return (
    <MotionBox
      whileHover={{ scale: 1.05, rotateZ: 3 }}
      whileTap={{ scale: hover ? 1.05 : 0.95 }}
      drag
      dragMomentum={false}
      sx={{ position: "relative" }}
    >
      <pre>{JSON.stringify(card, null, 2)}</pre>

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          // backgroundImage: "linear-gradient(to bottom, transparent, #0005)",
        }}
      />
      <img draggable='false' src={`/imgs/playground/${card.sourceLowRes}`} />
      <Checkbox
        icon={<TurnedInNot />}
        checked={inArray(card.sourceLowRes)}
        onChange={handleChange}
        value={card.sourceLowRes}
        onMouseDown={() => setHover(true)}
        onMouseUp={() => setHover(false)}
        checkedIcon={<TurnedIn />}
        sx={{ position: "absolute", bottom: 0, left: 0 }}
      />
    </MotionBox>
  );
};

const Playground: React.FC = () => {
  const { token, posts, randomQuestion } = useLevelContext();
  const sendAnswer = (val: { answer: string }, { resetForm }) => {
    console.log(val);
    socket.emit("sendAnswer", { answer: val.answer, token });
    resetForm();
  };
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
        <Grid container>
          {posts.map(card => (
            <Grid item xs={12} sm={8} lg={2}>
              <Card card={card} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </SavedDocumentsProvider>
  );
};

export default Playground;
