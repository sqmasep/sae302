import express from "express";
import log from "./utils/log";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 3001;
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.get("/", (req, res) => {
  return res.status(200).send("slt");
});

app.listen(PORT, () =>
  log.info(`Server listening at port ${log.danger(PORT)}`)
);
