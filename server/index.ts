import express from "express";
import log from "./utils/log";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import http from "http";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { jwtVerify } from "./utils/jwt";
import { Answer, Post, Question } from "./schemas";
import getPostsByToken from "./utils/getPostsByToken";
dotenv.config();

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET_KEY: string;
    }
  }
}

export interface Token {
  level: number;
  idQuestion: string;
}

mongoose
  .connect("mongodb://127.0.0.1:27017/sae302")
  .then(() => log.success("MongoDB: connected"))
  .catch(() => log.error("MongoDB: failed to connect"));

const PORT = 3001;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.get("/", (req, res) => {
  return res.status(200).send("hé non!");
});

app.get("/admin", (req, res) => {
  return res.status(200).send("dommage!");
});

app.get("/wp-admin", (req, res) => {
  return res.status(200).send("wordpress, c'est la hess");
});

io.on("connection", async socket => {
  log.success(`Socket ${socket.id} connected`);

  socket.on("getPosts", async token => {
    let decoded: Token | undefined;
    let level: Token["level"] = 0;
    try {
      if (token && token !== "0") {
        decoded = (await jwtVerify(token)) as Token;
        console.log("decoded,,,", decoded);
        level = decoded.level;
      }
    } catch (error) {}
    const filter = decoded?.idQuestion
      ? { _id: decoded?.idQuestion }
      : { level: 0 };
    const question = await Question.findOne(filter);
    console.log("questions: ", question);
    const posts = await Post.find({ idQuestions: question?._id });
    socket.emit("receivePosts", { posts, question });
  });

  socket.on("sendAnswer", async ({ token, answer }) => {
    let decoded: Token | undefined;
    let level: Token["level"] = 0;
    try {
      console.log("token: ", token);

      // if the user already answered once
      if (token && token !== "0") {
        decoded = (await jwtVerify(token)) as Token;
        console.log("decoded:::", decoded);
        level = decoded?.level;
      }
      // find current question by level
      const currentQuestion = await Question.findOne({ level });

      // find correct answers for current question
      const currentAnswers = await Answer.find({
        idQuestion: currentQuestion?._id,
      });
      // console.log(currentQuestion);
      // console.log(currentAnswers);

      const matchedAnswer = currentAnswers.find(a =>
        a.variants
          .map(a => a.toLowerCase())
          .includes(answer.trim().toLowerCase())
      );

      if (matchedAnswer) {
        const nextQuestion = await Question.findById(
          matchedAnswer.nextIdQuestion
        );
        log.success("Matched Answer. Passing next question");

        // find posts for next level
        const posts = await Post.find({ idQuestions: nextQuestion?._id });

        // sign token (storing idQuestion & level (& maybe question index to get the same question?))
        const token = jwt.sign(
          { level: nextQuestion?.level || "0", idQuestion: nextQuestion?._id },
          process.env.JWT_SECRET_KEY
        );

        console.log(nextQuestion?.question);
        socket.emit("receiveToken", {
          token,
          posts,
          question: nextQuestion,
        });
      } else {
        log.info(`Answer: ${log.danger("not in variants")}`);
      }
    } catch (error) {
      log.error(error);
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
    async ({ variants, nextIdQuestion, idQuestion }) => {
      log.info(`${variants}
      ${nextIdQuestion}
      ${idQuestion}
    `);
      await Answer.create({ variants, nextIdQuestion, idQuestion });
    }
  );
});

server.listen(PORT, () =>
  log.info(`Server: listening at port ${log.danger(PORT)}`)
);
