import { redisClient, isConnected } from "../lib/redis";
import log from "./log";

const DEFAULT_TTL = 60 * 60 * 24 * 7; // 1 week
const PREFIX = "movie:";

const fromCache = <T>(key: string, cb: (...args: any[]) => T) => {
  return new Promise<T>(async resolve => {
    if (process.env.HAS_CACHE === "false" || !isConnected) {
      log.info(`fromCache: ${log.danger(`No client connected - key: ${key}`)}`);
      return resolve(await cb());
    }

    const timeStart = Date.now();
    const cachedValue = await redisClient.get(`${PREFIX}${key}`);

    if (cachedValue !== null) {
      const timeEnd = Date.now();
      log.info(`Cache hit for key ${key} in ${timeEnd - timeStart}ms`);
      return resolve(JSON.parse(cachedValue));
    }

    log.info(`Cache miss for key ${key}`);
    const valueToCache = await cb();
    await redisClient.setEx(
      `${PREFIX}${key}`,
      DEFAULT_TTL,
      JSON.stringify(valueToCache)
    );
    log.info(`New cache set for key ${key}`);
    return valueToCache;
  });
};

export default fromCache;
