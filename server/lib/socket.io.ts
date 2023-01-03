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
import Winner from "../schemas/Winner";

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

  socket.on("sendNickname", async ({ token, nickname }) => {
    const tokenSchema = z.string();
    const nicknameSchema = z.string();

    let decoded: Token | undefined;
    let level: Token["level"] = 0;

    try {
      const parsedToken = tokenSchema.parse(token);
      decoded = (await jwtVerify(parsedToken)) as Token;
      level = decoded.level;
      console.log("sendnickname decoded:", decoded);

      if (decoded?.win !== true) return;
      if (decoded?.inLeaderboard === true) {
        socket.emit("alreadyInLeaderboard", "");
        return socket.emit(
          "error",
          "Vous avez déjà été ajouté au leaderboard."
        );
      }

      const parsedNickname = nickname && nicknameSchema.parse(nickname);

      // win
      const winners = await fromCache(
        "winners",
        async () => await Winner.find()
      );

      const winner = await Winner.updateOne(
        {
          socketId: socket.id,
        },
        {
          $set: {
            nickname: parsedNickname,
          },
        }
      );
      log.success("Nickname updated");

      const newToken = jwt.sign(
        { win: true, inLeaderboard: true },
        process.env.JWT_SECRET_KEY
      );
      console.log("newToken nickname:", newToken);
      socket.emit("win", { token: newToken });
    } catch (error) {
      log.error(error);
      socket.emit("error", "Une erreur interne est survenue.");
    }
  });

  socket.on("win", async ({ token }) => {
    const tokenSchema = z.string();

    let decoded: Token | undefined;
    let level: Token["level"] = 0;

    try {
      const parsedToken = tokenSchema.parse(token);
      decoded = (await jwtVerify(parsedToken)) as Token;
      level = decoded.level;
      console.log(decoded);
      if (decoded?.win !== true) return;
      if (decoded?.inLeaderboard === true) {
        socket.emit("alreadyInLeaderboard");
        return socket.emit(
          "error",
          "Vous avez déjà été ajouté au leaderboard."
        );
      }

      const winners = await fromCache(
        "winners",
        async () => await Winner.find()
      );

      if (winners.length === 0) {
        const winnerToken = jwt.sign(
          { winnerId: socket.id },
          process.env.JWT_SECRET_KEY
        );
        socket.emit("firstWinner", {
          isFirstWinner: !winners.length,
          winnerToken,
        });
        const winner = await Winner.create({
          socketId: socket.id,
          date: new Date(Date.now()),
        });
        log.success("Winner created");
      }
    } catch (error) {
      log.error(error);
      socket.emit("error", "Une erreur interne est survenue.");
    }
  });

  socket.on("getPosts", async token => {
    let decoded: Token | undefined;
    let level: Token["level"] = 0;
    try {
      if (token && token !== "0") {
        decoded = (await jwtVerify(token)) as Token;
        level = decoded.level;

        if (decoded.win === true) {
          return socket.emit("win");
        }
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

  // rate limiter
  let rateLimit = false;

  socket.on("sendAnswer", async ({ token, answer }) => {
    if (rateLimit) return socket.emit("error", "Trop de requêtes");
    rateLimit = true;

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

      // find answer in variants
      const matchedAnswer = currentAnswers.find(a =>
        a.variants
          .map(a => a.toLowerCase())
          .includes(parsedAnswer.trim().toLowerCase())
      );

      // answer is not in variants
      if (!matchedAnswer) {
        log.info(`Answer: ${log.danger("not in variants")}`);
        return socket.emit("error", "Mauvaise réponse");
      }

      // it's a win!
      if (matchedAnswer.last) {
        log.info(`Answer: ${log.good("last")}`);
        const newToken = jwt.sign({ win: true }, process.env.JWT_SECRET_KEY);
        return socket.emit("win", { token: newToken });
      }

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
      console.log(newToken);

      socket.emit("receiveToken", {
        token: newToken,
        posts,
        question: nextQuestion,
      });
    } catch (error) {
      log.error(error);
      socket.emit("error", "Une erreur interne est survenue.");
    } finally {
      setTimeout(() => {
        rateLimit = false;
      }, 5000);
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
