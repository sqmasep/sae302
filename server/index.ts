import express from "express";
import log from "./utils/log";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import http from "http";
import Question from "./schemas/Question";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { jwtVerify } from "./utils/jwt";
import Answer from "./schemas/Answer";
import Post from "./schemas/Post";
dotenv.config();

interface Token {
  level: number;
  question: string;
  questionId: string;
}

mongoose
  .connect("mongodb://127.0.0.1/testdb")
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

io.on("connection", async socket => {
  log.success(`Socket ${socket.id} connected`);

  socket.on("getPosts", async ({ token }) => {
    let level: Token["level"] = 0;
    try {
      if (token && token !== "0") {
        const decoded = (await jwtVerify(token)) as Token;
        level = decoded.level;
      }
    } catch (error) {}
    // TODO: select une des questions dans ce Question.find()
    // const question = await Question.find({ level });
    // const posts = Post.find({});
    // socket.emit("receivePosts", posts);
  });

  socket.on("sendAnswer", async ({ token, answer, idQuestion }) => {
    let level: Token["level"] = 0;
    try {
      console.log("token: ", token);
      if (token && token !== "0") {
        const decoded = (await jwtVerify(token)) as Token;
        level = decoded.level;
      }
      const currentQuestion = await Question.findOne({ level });
      const currentAnswer = await Answer.find({
        idQuestion: currentQuestion?._id,
      });
      console.log(currentQuestion);
      console.log(currentAnswer);
    } catch (error) {}
  });

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

  socket.on("createAnswer", data => {});
});

server.listen(PORT, () =>
  log.info(`Server: listening at port ${log.danger(PORT)}`)
);
