const mongoose = require("mongoose");

const urlSchema = mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    visitCounts: {
      type: Number,
    },
  },
  { timeStamps: true }
);

const URL = mongoose.model("url", urlSchema);

module.exports = URL;
