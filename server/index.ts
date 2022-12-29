import express from "express";
import log from "./utils/log";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import multer from "multer";
import Post from "./schemas/Post";

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
      HAS_CACHE: string;
      JWT_SECRET_KEY: string;
    }
  }
}

export interface Token {
  level: number;
  idQuestion: string;
  win?: boolean;
  inLeaderboard?: boolean;
}

// Services
import("./lib/mongoose");
import("./lib/redis");
import("./lib/socket.io");

const PORT = 3001;
const app = express();
export const server = http.createServer(app);

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.get("/", (req, res) => res.status(200).send("hé non!"));
app.get("/admin", (req, res) => res.status(200).send("dommage!"));
app.get("/wp-admin", (req, res) =>
  res.status(200).send("wordpress, c'est la hess")
);

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

server.listen(PORT, () =>
  log.info(`HTTP Server: listening at port ${log.danger(PORT)}`)
);
