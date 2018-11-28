const mongoose = require('mongoose')
const checkSchema = new mongoose.Schema(
  {
    control: String,
    fileRef: String,
    fileId: String,
    origin: String,
    timestamp: Date,
    passed: Boolean,
    description: String,
    references: String,
    component: String,
    release: String,
  },
  { timestamps: true },
)

module.exports.check = mongoose.model('check', checkSchema)
