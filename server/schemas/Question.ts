import mongoose from "mongoose";

const Question = new mongoose.Schema({
  question: {
    type: [String],
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Question", Question);
