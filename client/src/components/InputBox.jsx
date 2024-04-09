import React, { useState, useContext, useEffect } from "react";
import { MdAddBox } from "react-icons/md";
import { todoContext } from "../App.jsx";

const InputBox = () => {
  const { dispatch, state: todos } = useContext(todoContext);
  const [todo, setTodo] = useState("");

  const addTodo = () => {
    if (!todo.trim()) {
      alert("Please add a new todo!");
      return;
    }

    if (todos.some((item) => item === todo)) {
      alert("Todo already exists!");
      return;
    }

    dispatch({ type: "ADD_TODO", payload: todo });
    setTodo("");
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

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
