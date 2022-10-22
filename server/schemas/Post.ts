import mongoose, { SchemaTypes } from "mongoose";

const Post = new mongoose.Schema({
  source: String,
  idQuestions: [SchemaTypes.ObjectId],
});

export default mongoose.model("Post", Post);
