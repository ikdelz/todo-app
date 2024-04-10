import mongoose, { Schema } from "mongoose"

const todoSchema = new Schema({
  todo : {
    type : String,
    required : true
  }
}, { timestamps : true })

export default mongoose.model("Todo", todoSchema)