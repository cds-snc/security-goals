import { Connection } from "mongoose";

const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)
mongoose.set('bufferCommands', false)

interface ConnectOptions {
  useNewUrlParser: boolean;
  auth?: {};
}

const connect = async (uri: string, user:string = "", password:string = ""): Promise<Connection | void> => {

  const mongodbUri:string = uri
  let connect = null

  try {
    const options: ConnectOptions = {
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
