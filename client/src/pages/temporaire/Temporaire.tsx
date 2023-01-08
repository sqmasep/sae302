import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import socket from "../../lib/socket";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import axios from "axios";

const CreateMultiplePossibilities: React.FC<{
  setState: any;
  name: string;
  state: any;
}> = ({ setState, state, name }) => {
  return (
    <>
      <Formik
        initialValues={{ [name]: "" }}
        validationSchema={toFormikValidationSchema(
          z.object({
            [name]: z.string(),
          })
        )}
        onSubmit={(values, { resetForm }) => {
          setState(prev => [...prev, values[name]]);
          resetForm();
        }}
      >
        {({ handleChange, handleBlur }) => {
          return (
            <Form>
              <TextField
                onChange={handleChange}
                onBlur={handleBlur}
                name={name}
                label={name}
              />

              <ErrorMessage name={name} />
            </Form>
          );
        }}
      </Formik>
      {name} ajoutés:
      <Stack direction='column'>
        {state.map(el => (
          <Box>
            {el}
            <IconButton
              onClick={() => setState(state.filter(e => e !== el))}
              children={<Close />}
            />
          </Box>
        ))}
      </Stack>
    </>
  );
};

const Temporaire: React.FC = () => {
  const [questions, setQuestions] = useState<string[]>([]);
  const [reponses, setReponses] = useState<string[]>([]);
  const [dataQuestions, setDataQuestions] = useState<any[]>([]);
  const [reponseSelect, setReponseSelect] = useState("");
  const [isLastAnswerBeforeWin, setIsLastAnswerBeforeWin] = useState(false);
  const [nextQuestionSelect, setNextQuestionSelect] = useState("");

  const sendQuestions = ({ level }: any) => {
    if (!questions.length) return console.log("need questions");
    socket.emit("sendQuestion", { questions, level });
    setQuestions([]);
  };
  const tabs = ["questions", "réponses", "post"];
  const [tab, setTab] = useState(tabs[0]);
  const handleTabs = (_, value) => setTab(value);

  useEffect(() => {
    socket.emit("getQuestions");
    socket.on("receiveQuestions", data => setDataQuestions(data));
  }, [tab]);

  const lowResImgRef = useRef();
  const highResImgRef = useRef();

  return (
    <Container>
      <Tabs onChange={handleTabs} value={tab}>
        {tabs.map(e => (
          <Tab label={e} key={e} value={e} />
        ))}
      </Tabs>
      {tab === "questions" && (
        <>
          <CreateMultiplePossibilities
            state={questions}
            setState={setQuestions}
            name='questions'
          />
          <Formik
            initialValues={{ level: 0 }}
            onSubmit={sendQuestions}
            validationSchema={toFormikValidationSchema(
              z.object({
                level: z.number().nonnegative(),
              })
            )}
          >
            {({ handleChange, handleBlur }) => (
              <Form>
                <Stack direction='column'>
                  <TextField
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name='level'
                    label='level'
                    type='number'
                  />
                  <Button sx={{ mt: 4 }} type='submit' variant='contained'>
                    envoyer les questions!
                  </Button>
                  <ErrorMessage name='level' />
                </Stack>
              </Form>
            )}
          </Formik>
        </>
      )}
      {tab === "réponses" && (
        <Stack direction='column'>
          <Select
            onChange={e => setReponseSelect(e.target.value)}
            required
            labelId='test'
            label='Sélectionnez une question'
          >
            {dataQuestions
              .sort((a, b) => a.level - b.level)
              .map(question => (
                <MenuItem value={question._id}>
                  ({question.level}) {question.question[0]}
                </MenuItem>
              ))}
          </Select>
          <CreateMultiplePossibilities
            state={reponses}
            setState={setReponses}
            name='réponses'
          />
          {reponseSelect}
          <Select
            onChange={e => setNextQuestionSelect(e.target.value)}
            required
            labelId='test'
            label='Sélectionnez une question'
          >
            {dataQuestions
              .sort((a, b) => a.level - b.level)
              .filter(
                q =>
                  q.level >
                  (dataQuestions.find(e => e._id === reponseSelect)?.level || 0)
              )
              ?.map(question => (
                <MenuItem value={question._id}>
                  ({question.level}) {question.question[0]}
                </MenuItem>
              ))}
          </Select>
          <FormControlLabel
            checked={isLastAnswerBeforeWin}
            onChange={() => setIsLastAnswerBeforeWin(prev => !prev)}
            label='dernière réponse avant le win ?'
            control={<Checkbox />}
          />
          <Button
            sx={{ mt: 4 }}
            onClick={() =>
              reponses.length &&
              socket.emit("createAnswer", {
                variants: reponses,
                nextIdQuestion: nextQuestionSelect,
                idQuestion: reponseSelect,
                last: isLastAnswerBeforeWin,
              })
            }
            variant='contained'
          >
            créer les réponses
          </Button>
        </Stack>
      )}
      {tab === "post" && (
        <Box>
          <Formik
            initialValues={{ idQuestions: [] }}
            onSubmit={async d => {
              const formData = new FormData();
              formData.append("lowResImg", lowResImgRef?.current.files[0]);
              formData.append("highResImg", highResImgRef?.current.files[0]);
              formData.append("idQuestions", d.idQuestions);
              await axios.post("http://localhost:3001/getBothImgs", formData);
            }}
          >
            {({ values, touched, handleChange, handleBlur, handleSubmit }) => {
              return (
                <Form encType='multipart/form-data'>
                  <Stack direction='column' spacing={2} mt={8}>
                    <Box>
                      <Typography>aperçu (low res)</Typography>
                      <input ref={lowResImgRef} type='file' name='lowResImg' />
                      {touched.lowResImg && <ErrorMessage name='lowResImg' />}
                    </Box>
                    <Box>
                      <Typography>high res</Typography>
                      <input
                        ref={highResImgRef}
                        type='file'
                        name='highResImg'
                      />
                      {touched.highResImg && <ErrorMessage name='highResImg' />}
                    </Box>
                  </Stack>
                  <Select
                    multiple
                    value={values.idQuestions}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name='idQuestions'
                    fullWidth
                  >
                    {dataQuestions?.map(q => (
                      <MenuItem value={q._id}>
                        ({q.level}) {q.question[0]}
                      </MenuItem>
                    ))}
                  </Select>
                  <Button fullWidth sx={{ mt: 4 }} type='submit'>
                    envoyer
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </Box>
      )}
    </Container>
  );
};

export default Temporaire;
