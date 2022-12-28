import express from "express";
import log from "./utils/log";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import http from "http";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { jwtVerify } from "./utils/jwt";
import getPostsByToken from "./utils/getPostsByToken";
import multer from "multer";
import Question from "./schemas/Question";
import Post from "./schemas/Post";
import Answer from "./schemas/Answer";

// TODO: remove before prod
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "../client/public/imgs/playground/"),
  filename: (req, file, cb) => cb(null, file.originalname),
});
const upload = multer({ storage });

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

// TODO: remove app.post stuff before prod
app.post(
  "/getBothImgs",
  upload.fields([
    { name: "lowResImg", maxCount: 1 },
    { name: "highResImg", maxCount: 1 },
  ]),
  async (req, res) => {
    // @ts-ignore
    const sourceLowRes = req.files?.lowResImg[0].filename;
    // @ts-ignore
    const sourceHighRes = req.files?.highResImg[0].filename;

    const idQuestions: string[] = req.body.idQuestions.split(",");

    await Post.create({
      idQuestions,
      sourceLowRes,
      sourceHighRes,
    });
    log.success("files sent successfully. Instance Post created");
  }
);

io.on("connection", async socket => {
  log.success(`Socket ${socket.id} connected`);

  // NbUsers
  const sendNbUsers = () => io.sockets.emit("nbUsers", io.sockets.sockets.size);
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
        // console.log("decoded,,,", decoded);
        level = decoded.level;
      }
    } catch (error) {}
    const filter = decoded?.idQuestion
      ? { _id: decoded?.idQuestion }
      : { level: 0 };
    const question = await Question.findOne(filter);
    // console.log("questions: ", question);

    const posts = await Post.find({ idQuestions: question?._id });
    // console.log("posts::::", posts);

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
      const currentQuestion = await Question.findOne(filter);

      // find correct answers for current question
      const currentAnswers = await Answer.find({
        idQuestion: currentQuestion?._id,
      });
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

      const nextQuestion = await Question.findById(
        matchedAnswer.nextIdQuestion
      );
      log.success("Matched Answer. Passing next question");

      // find posts for next level
      const posts = await Post.find({ idQuestions: nextQuestion?._id });

      // sign token (storing idQuestion & level (& maybe question index to get the same question?))
      const newToken = jwt.sign(
        { level: nextQuestion?.level || "0", idQuestion: nextQuestion?._id },
        process.env.JWT_SECRET_KEY
      );

      console.log(nextQuestion?.question);
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

server.listen(PORT, () =>
  log.info(`Server: listening at port ${log.danger(PORT)}`)
);
