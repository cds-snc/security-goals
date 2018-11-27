let model

const createModel = mongoose => {
  if (model) {
    return model
  }

  const Schema = mongoose.Schema
  const ModelSchema = new Schema(
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
    { timestamps: { createdAt: 'created_at' } },
  )

  model = mongoose.model('Check', ModelSchema)
  return model
}

module.exports.createModel = createModel
