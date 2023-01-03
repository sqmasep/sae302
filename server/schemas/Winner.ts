import mongoose from "mongoose";

const Winner = new mongoose.Schema({
  socketId: {
    type: String,
    required: true,
  },
  winnerToken: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  nickname: String,
});

export default mongoose.model("Winner", Winner);
