import { useState } from "react";
import { MdAddBox } from "react-icons/md"
import { todoContext } from "../App.jsx";
import { useContext } from "react";

const InputBox = () => {
  const { dispatch, state:todos } = useContext(todoContext)
  const [todo, setTodo] = useState("")

  const addTodo = () => {
    if (!todo) {
      alert("Please add new todo!")
    }

    if (todo) {
      dispatch({ type : "ADD_TODO", payload : todo })
      // localStorage.setItem("todos", JSON.stringify(todos))
    }
  }

  return (
    <div className="inputBox">
      <input
        type="text"
        placeholder="Enter new todo..."
        onChange={(e) => setTodo(e.target.value)}
      />
      <button onClick={addTodo}>
        <MdAddBox />
        <span>Add</span>
      </button>
    </div>
  );
}

export default InputBox