import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const Temporaire: React.FC = () => {
  const [questions, setQuestion] = useState([]);

  const sendQuestions = () => {};

  return (
    <div>
      <h2>questions</h2>
      <Formik
        initialValues={{ question: "" }}
        validationSchema={toFormikValidationSchema(
          z.object({
            question: z.string(),
          })
        )}
        onSubmit={({ question }, { resetForm }) => {
          setQuestion(prev => [...prev, question]);
          resetForm();
        }}
      >
        {({ values, errors, isSubmitting }) => {
          return (
            <Form>
              <Field name='question' />
              <ErrorMessage name='question' />
            </Form>
          );
        }}
      </Formik>
      questions ajoutés:
      {questions.map(el => (
        <div>
          {el}
          <button onClick={() => setQuestion(questions.filter(q => q !== el))}>
            x
          </button>
        </div>
      ))}
      <button onClick={sendQuestions}>envoyer les questions</button>
    </div>
  );
};

export default Temporaire;
