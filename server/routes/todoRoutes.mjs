import Todo from '../models/todo.mjs'
import { Router, json } from "express";
const router = Router()

/**
 * @GET /todos
 * Endpoint to get all todos
*/
router.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find({}).sort({ createdAt: -1 })
  
    if (todos.length === 0) {
      return res.status(404).json({ error : "No todos found" })
    }
     return res.status(200).json(todos)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
})

/**
 * @POST /todos
 * Endpoint to create todos
*/
router.post('/todos', async (req, res) => {
  const { todo } = req.body

  if (!todo) {
    return res.status(400).json({ error: "Enter todo please!" })
  }

  try {
    const exists = await Todo.findOne({ todo })
    if (exists) {
      throw new Error("This Todo already exists!")
    }

    const newTodo = await Todo.create({
      todo,
    })

    if (!newTodo) {
      throw new Error("Something went wrong!")
    }

    return res.status(200).json(newTodo)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
})

export default router