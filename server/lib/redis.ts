import { createClient } from "redis";
import log from "../utils/log";

export const redisClient = createClient({
  url: "redis://localhost:6379",
});

export let isConnected: boolean = false;

(async () => {
  try {
    await redisClient.connect();
    log.info(`Redis: ${log.good("connected")}`);
    isConnected = true;
  } catch (error) {
    log.error("Redis: failed to connect");
    isConnected = false;
  }
})();
