const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    author: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    image: {
      type: Buffer,
      required: true,
    },
    description: String,
  },
  { timestamps: true }
);

const History = mongoose.model("History", historySchema)

module.exports = History;
