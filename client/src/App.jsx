import InputBox from "./components/InputBox"
import Todos from "./components/Todos"
import { createContext, useEffect, useReducer } from "react";

export const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return  [...state, action.payload];

    case "REMOVE_TODO":
      return state.filter((todo) => todo !== action.payload);
    
    default:
      return state;
  }
}
export const todoContext = createContext()

const App = () => {
  const [state, dispatch] = useReducer(todoReducer, [])

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      dispatch({ type: "SET_TODOS", payload: JSON.parse(storedTodos) });
    }
  }, [dispatch]);

  return (
    <div className="todo-list">
      <todoContext.Provider value={{state, dispatch}}>
        <h2>Todo App</h2>
        <InputBox />
        <Todos />
      </todoContext.Provider>
    </div>
  );
}

export default App
