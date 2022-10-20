import express from "express";
import log from "./utils/log";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import http from "http";
dotenv.config();

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
  return res.status(200).send("slt");
});

io.on("connection", socket => {
  log.success("Socket connected");
});

server.listen(PORT, () =>
  log.info(`Server listening at port ${log.danger(PORT)}`)
);
