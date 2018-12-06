const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const connect = async (uri, user = '', password = '') => {
  const mongodbUri = uri
  let connect = null
  try {
    const options = {
      useNewUrlParser: true,
    }

    if (user) {
      options.auth = {
        user: user,
        password: password,
      }
    }

    connect = await mongoose
      .connect(
        mongodbUri,
        options,
      )
      .then(() => console.log('⚡ Database connected'))
  } catch (err) {
    console.error('⚠ Database connection error:', err.message)
    return false
  }

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
