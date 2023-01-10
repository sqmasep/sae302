import express from "express";
import log from "./utils/log";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";

dotenv.config();

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HAS_CACHE: string;
      RATE_LIMIT_DELAY: number;
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

server.listen(PORT, () => {
  log.info(`HTTP Server: ${log.good("listening")} at port ${log.danger(PORT)}`);
});
