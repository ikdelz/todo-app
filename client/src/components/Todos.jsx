import { LuListTodo } from "react-icons/lu";
import {
  IoListCircleOutline,
  IoCheckmarkDoneCircleOutline,
} from "react-icons/io5";
import { MdDeleteSweep, MdEdit } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { todoContext } from "../App";
import { useFetch } from "../hooks/useFetch";

const Todos = () => {
  const { dispatch, state: todos } = useContext(todoContext);
  
  const { error, isLoading } = useFetch("http://localhost:8080/todos");

  // states
  const [editIndex, setEditIndex] = useState(null)
  const [doneIndex, setDoneIndex] = useState(null);
  const [updatedTodo, setUpdatedTodo] = useState("")
  const [done, setDone] = useState(false)

  const handleDelete = async(id) => {
    try {
      const res = await fetch(`http://localhost:8080/todos/${id}`, {
        method: "DELETE",
      });
      const json = await res.json()

      if (res.ok) {
        dispatch({ type: "REMOVE_TODO", payload: id })
        console.log(json.message)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleEdit = async(index) => {
    setEditIndex(index)
    setUpdatedTodo(todos[index].todo)
  }

  const handleDone = (index) => {
    setDone(!done);
    setDoneIndex(index)
  }

  const handleSave = async(index, id) => {
    setEditIndex(null);
    try {
      const res = await fetch(`http://localhost:8080/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type" : "application/json"},
        body : JSON.stringify({ todo: updatedTodo })
      });
      const json = await res.json()

      if (res.ok) {
        dispatch({
          type: "UPDATE_TODO",
          payload: { index, updatedTodo: json.updatedTodo },
        });
        console.log(json.message)
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="todos">
      <h3>
        <LuListTodo />
        Todos
      </h3>
      <ul>
        {error && <div>{error}</div>}
        {isLoading && <div>Loading...</div>}
        {todos.length !== 0 &&
          todos.map((todo, index) => (
            <li
              key={index}
              style={
                done && doneIndex === index
                  ? { opacity: "0.6", textDecoration: "line-through" }
                  : {}
              }
            >
              {editIndex === index ? (
                <>
                  <div>
                    <input
                      type="text"
                      value={updatedTodo}
                      onChange={(e) => setUpdatedTodo(e.target.value)}
                    />
                  </div>
                  <div>
                    <button onClick={() => handleSave(index, todo._id)}>
                      Save
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <IoListCircleOutline />
                    <span>{todo.todo}</span>
                  </div>
                  <div>
                    <button onClick={() => handleDone(index)}>
                      <IoCheckmarkDoneCircleOutline />
                    </button>
                    <button onClick={() => handleEdit(index)}>
                      <MdEdit />
                    </button>
                    <button onClick={() => handleDelete(todo._id)}>
                      <MdDeleteSweep />
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        <div style={{ display: "flex", flexDirection: "column", alignItems:'center', marginTop:"10px" }}>
          <strong style={{fontWeight : 650, fontSize:"15px"}}>Powered By MERN Stack</strong>
          <small>2024 - Elise</small>
        </div>
      </ul>
    </div>
  );
};

export default Todos;