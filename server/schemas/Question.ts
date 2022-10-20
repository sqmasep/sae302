import mongoose from "mongoose";

const Question = new mongoose.Schema({
  question: [String],
  level: Number,
});

export default Question;
