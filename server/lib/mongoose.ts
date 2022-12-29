import mongoose from "mongoose";
import log from "../utils/log";

(async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/sae302");
    log.info("MongoDB: connected");
  } catch (error) {
    log.error("MongoDB: failed to connect");
  }
})();
