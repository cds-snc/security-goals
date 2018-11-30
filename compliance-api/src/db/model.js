const mongoose = require('mongoose')
const releaseSchema = new mongoose.Schema(
  {
    release: String,
    controls: Array,
    passed: Boolean,
    passing: Number,
    total: Number,
  },
  { timestamps: true },
)

module.exports.releaseModel = mongoose.model('release', releaseSchema)
