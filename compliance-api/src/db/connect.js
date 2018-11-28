const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const connect = async (uri, user, password) => {
  const mongodbUri = uri
  try {
    await mongoose.connect(
      mongodbUri,
      {
        useNewUrlParser: true,
        auth: {
          user: user,
          password: password,
        },
      },
    )
  } catch (err) {
    console.error('⚠ Database connection error:', err.message)
    return false
  }

  console.info('⚡ Database connected')
  return connect
}

const dbConnect = async () => {
  const { DB_URI, DB_USER, DB_PASS } = process.env
  const db = await connect(
    DB_URI,
    DB_USER,
    DB_PASS,
  )
  if (!db) return

  return db
}

module.exports.dbConnect = dbConnect
