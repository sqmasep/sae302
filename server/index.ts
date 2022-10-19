import express from "express";
import log from "./utils/log";
const app = express();
const PORT = 3001;

app.listen(PORT, () => log.success(`Server listening at port ${PORT}`));
