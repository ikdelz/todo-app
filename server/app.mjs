import express, { json } from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"
import todoRoutes from './routes/todoRoutes.mjs'

const app = express()
dotenv.config()

// Middlewares
app.use(json())
app.use(cors({
  origin: 'https://elise-todo-app.vercel.app',
  credentials: true,
}));
app.use(todoRoutes)

app.listen(process.env.PORT, async(err) => {
  if (err) {
    console.log(err.message)
    return
  }
  console.log(`Server initiated on port ${process.env.PORT || 8081}`)

  // DB connection
  try {
    const conn = await mongoose.connect(process.env.DB_URI)
    console.log(`Connected on => ${conn.connection.host}`)
  } catch (error) {
    console.log("Error connecting to MongoDb " + error.message)
  }
})
