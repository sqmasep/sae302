import { Box, Input, Stack, Typography } from "@mui/material";
import { formatDistance } from "date-fns";
import { Field, Form, Formik, FormikHelpers, FormikValues } from "formik";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import socket from "../../lib/socket";

interface MessageInterface {
  date: Date;
  content: string;
  sender: string;
}

type MessageContent = Pick<MessageInterface, "content">;

const Chatbox: React.FC = () => {
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const { pathname } = useLocation();

  useEffect(() => {
    socket.on(
      "messages",
      (message: MessageInterface & { pathname: string }) => {
        message.pathname === pathname &&
          setMessages(prev => [...prev, message]);
      }
    );
  }, []);

  const sendMessage = (
    { content }: MessageContent,
    { resetForm }: FormikHelpers<MessageContent>
  ) => {
    socket.emit("message", { content, pathname });
    setMessages(prev => [...prev, { content, date: new Date(), sender: "me" }]);
    resetForm();
  };

  return (
    <Box sx={{ position: "fixed", bottom: 0, left: 0 }}>
      <Formik initialValues={{ content: "" }} onSubmit={sendMessage}>
        <Form>
          {messages.map(({ content, date, sender }) => (
            <Stack key={`${Math.random()}${sender}`} direction='column'>
              <Stack>
                <Typography>{sender}</Typography>
                <Typography>{content}</Typography>
                <Typography>{formatDistance(Date.now(), date)}</Typography>
              </Stack>
            </Stack>
          ))}
          <Field as={Input} name='content' />
        </Form>
      </Formik>
    </Box>
  );
};

export default Chatbox;
