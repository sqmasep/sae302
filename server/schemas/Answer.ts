import mongoose, { SchemaTypes } from "mongoose";

const Answer = new mongoose.Schema({
  variants: [String],
  idQuestion: SchemaTypes.ObjectId,
  nextIdQuestion: SchemaTypes.ObjectId,
  last: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Answer", Answer);
