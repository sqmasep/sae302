import jwt from "jsonwebtoken";
import log from "./log";

const jwtVerify = async (arg: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(arg, process.env.JWT_SECRET_KEY as string, (err, decoded) => {
      if (err) {
        log.error(`JWT Verify: ${err.message}`);
        return reject(err);
      }
      log.success("JWT Verify: verified successfully!");
      return resolve(decoded);
    });
  });
};

export { jwtVerify };
