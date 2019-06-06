const mongoose = require("mongoose");

const releaseSchema = new mongoose.Schema(
  {
    release: String,
    controls: Array,
    passed: Boolean,
    passing: Number,
    total: Number,
    releaseTimeStamp: Date
  },
  { timestamps: true },
);

export const releaseModel = mongoose.model("releases", releaseSchema);
