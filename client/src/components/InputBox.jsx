import React, { useState, useContext, useEffect } from "react";
import { MdAddBox } from "react-icons/md";
import { todoContext } from "../App.jsx";

const InputBox = () => {
  const { dispatch, state: todos } = useContext(todoContext);
  const [todo, setTodo] = useState("");

  const addTodo = async() => {
    const res = await fetch('https://todo-app-sfjf.onrender.com/todos', {
      method:"POST",
      headers: { "Content-Type" : "application/json"},
      body : JSON.stringify({ todo })
    })
    const json = await res.json()

    if (res.ok) {
      dispatch({ type: "ADD_TODO", payload: json })
    }

    if (!res.ok) {
      alert(json.error)
    }
  };

  return (
    <div className="inputBox">
      <input
        type="text"
        placeholder="Enter new todo..."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button onClick={addTodo}>
        <MdAddBox />
        <span>Add</span>
      </button>
    </div>
  );
};

export default InputBox;
