import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"

const app = express()
dotenv.config()

// Middlewares
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))

app.listen(process.env.PORT, async(err) => {
  if (err) {
    console.log(err.message)
    return
  }
  console.log(`Server initiated on port ${process.env.PORT}`)

  // DB connection
  try {
    const conn = await mongoose.connect(process.env.DB_URI)
    console.log(`Connected on /= ${conn.connection.host} =/`)
  } catch (error) {
    console.log("Error connecting to MongoDb " + error.message)
  }
})