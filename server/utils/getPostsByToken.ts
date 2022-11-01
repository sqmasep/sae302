import { Token } from "..";
import { Answer, Post, Question } from "../schemas";
import { jwtVerify } from "./jwt";

const getPostsByToken = async (token: string) => {
  let level = 0;
  if (token && token !== "0") {
    const decoded: Token = (await jwtVerify(token)) as Token;
    level = decoded.level;
    console.log("decoded: ", decoded);
  }

  Post.find({ idQuestions });
};

export default getPostsByToken;
