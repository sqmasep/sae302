import { Box, Input } from "@mui/material";
import { Field, Form, Formik, FormikHelpers, FormikValues } from "formik";
import React, { useState } from "react";
import socket from "../../lib/socket";

interface MessageInterface {
  date: Date;
  content: string;
  sender: string;
}

type MessageContent = Pick<MessageInterface, "content">;

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<MessageInterface[]>([]);

  socket.on("messages", (message: MessageInterface) => {
    setMessages(prev => [...prev, message]);
  });

  const sendMessage = (
    values: MessageContent,
    { resetForm }: FormikHelpers<MessageContent>
  ) => {
    socket.emit("message", values.content);
    resetForm();
  };

  return (
    <Box sx={{ position: "fixed", bottom: 0, left: 0 }}>
      <Formik initialValues={{ content: "" }} onSubmit={sendMessage}>
        <Form>
          {messages.map(({ content, date, sender }) => (
            <pre>{JSON.stringify(content, null, 2)}</pre>
          ))}
          <Field as={Input} name='content' />
        </Form>
      </Formik>
    </Box>
  );
};
