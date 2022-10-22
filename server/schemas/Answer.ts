import mongoose, { SchemaTypes } from "mongoose";

const Answer = new mongoose.Schema({
  variants: [String],
  idQuestion: SchemaTypes.ObjectId,
  nextIdQuestion: SchemaTypes.ObjectId,
});

export default mongoose.model("Answer", Answer);
