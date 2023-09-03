const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema(
  {
    _id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    division: {
      name: {
        type: String,
        required: true,
      },
      elo: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    },
    avatar: {
        type: String,
        required: true,
    },
    winRate: {
        type: Number,
        required: true,
    },
    matches : {
      type: Number,
      required: true,
    }
  },
  { timestamps: true }
);

const Player = mongoose.models.Player || mongoose.model("Player", playerSchema);

module.exports = Player;
