import mongoose, { SchemaTypes } from "mongoose";

const Post = new mongoose.Schema({
  sourceLowRes: {
    type: String,
    required: true,
  },
  sourceHighRes: {
    type: String,
    required: true,
  },
  idQuestions: {
    type: [SchemaTypes.ObjectId],
    ref: "Question",
  },
});

export default mongoose.model("Post", Post);
