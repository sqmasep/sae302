import { Server } from "socket.io";
import { Token } from "..";
import { jwtVerify } from "../utils/jwt";
import log from "../utils/log";
import { server } from "../index";
import Question from "../schemas/Question";
import Post from "../schemas/Post";
import { z } from "zod";
import Answer from "../schemas/Answer";
import jwt from "jsonwebtoken";
import fromCache from "../utils/fromCache";

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

const sendNbUsers = () => io.sockets.emit("nbUsers", io.sockets.sockets.size);

io.on("connection", async socket => {
  log.success(`Socket ${socket.id} connected`);

  sendNbUsers();
  socket.on("disconnect", () => {
    log.success(`Socket ${socket.id} disconnected`);
    sendNbUsers();
  });

  socket.on("getPosts", async token => {
    let decoded: Token | undefined;
    let level: Token["level"] = 0;
    try {
      if (token && token !== "0") {
        decoded = (await jwtVerify(token)) as Token;
        level = decoded.level;
      }
    } catch (error) {}
    const filter = decoded?.idQuestion
      ? { _id: decoded?.idQuestion }
      : { level: 0 };
    const question = await fromCache(
      `question-${JSON.stringify(filter)}`,
      async () => await Question.findOne(filter)
    );

    const posts = await fromCache(
      `posts-${question?._id}`,
      async () => await Post.find({ idQuestions: question?._id })
    );

    socket.emit("receivePosts", { posts, question });
  });

  socket.on("sendAnswer", async ({ token, answer }) => {
    // parsing data
    const tokenSchema = z.string();
    const answerSchema = z.string();

    let decoded: Token | undefined;
    let level: Token["level"] = 0;

    try {
      const parsedToken = tokenSchema.parse(token);
      console.log("parsedToken:", parsedToken);
      const parsedAnswer = answerSchema.parse(answer);

      // if the user already answered once
      if (parsedToken && parsedToken !== "0") {
        decoded = (await jwtVerify(parsedToken)) as Token;
        console.log("decoded token", decoded);
        level = decoded?.level;
      }

      // find current question by level
      const filter = decoded?.idQuestion
        ? { _id: decoded?.idQuestion }
        : { level: 0 };
      const currentQuestion = await fromCache(
        `question-${JSON.stringify(filter)}`,
        async () => await Question.findOne(filter)
      );

      // find correct answers for current question
      const currentAnswers = await fromCache(
        `answers-${currentQuestion?._id}`,
        async () =>
          await Answer.find({
            idQuestion: currentQuestion?._id,
          })
      );
      console.log("currentQuestion :", currentQuestion);
      console.log("currentAnswers: ", currentAnswers);

      const matchedAnswer = currentAnswers.find(a =>
        a.variants
          .map(a => a.toLowerCase())
          .includes(parsedAnswer.trim().toLowerCase())
      );

      if (!matchedAnswer) {
        log.info(`Answer: ${log.danger("not in variants")}`);
        return socket.emit("error", "Mauvaise réponse");
      }

      if (matchedAnswer.last) return socket.emit("win");

      const nextQuestion = await fromCache(
        `question-${matchedAnswer.nextIdQuestion}`,
        async () => await Question.findById(matchedAnswer.nextIdQuestion)
      );
      log.success("Matched Answer. Passing next question");

      // find posts for next level
      const posts = await Post.find({ idQuestions: nextQuestion?._id });

      // sign token (storing idQuestion & level (& maybe question index to get the same question?))
      const newToken = jwt.sign(
        { level: nextQuestion?.level || "0", idQuestion: nextQuestion?._id },
        process.env.JWT_SECRET_KEY
      );

      socket.emit("receiveToken", {
        token: newToken,
        posts,
        question: nextQuestion,
      });
    } catch (error) {
      log.error(error);
      socket.emit("error", "Une erreur interne est survenue.");
    }
  });

  socket.on("message", ({ content, pathname }) => {
    const schema = z.object({
      content: z.string(),
      pathname: z.string(),
    });

    try {
      const { content: parsedContent, pathname: parsedPathname } = schema.parse(
        { content, pathname }
      );
      console.log(parsedPathname);

      const trimmedParsedContent = parsedContent.trim();

      socket.broadcast.emit("messages", {
        content: trimmedParsedContent,
        sender: socket.id,
        date: Date.now(),
        pathname: parsedPathname,
      });
    } catch (err) {
      socket.emit("error", "Une erreur interne est survenue.");
    }
  });

  // NOTE: DEV (temporaire)
  socket.on("sendQuestion", async ({ questions, level }) => {
    log.info(`Questions: ${questions}`);
    log.info(`level: ${level}`);
    await Question.create({ question: [...questions], level });
    log.success("Question sent successfully");
  });
  socket.on("getQuestions", async () => {
    const data = await Question.find();
    socket.emit("receiveQuestions", data);
  });
  socket.on(
    "createAnswer",
    async ({ variants, nextIdQuestion, idQuestion, last = false }) => {
      log.info(`${variants}
      ${nextIdQuestion}
      ${idQuestion}
      ${last}
    `);
      last && (nextIdQuestion = null);
      await Answer.create({ variants, nextIdQuestion, idQuestion, last });
    }
  );
});
