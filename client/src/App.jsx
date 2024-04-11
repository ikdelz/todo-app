import InputBox from "./components/InputBox"
import Todos from "./components/Todos"
import { createContext, useReducer } from "react";

export const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.payload];

    case "SET_TODO":
      return action.payload;

    case "REMOVE_TODO":
      return state.filter((todo) => todo._id !== action.payload);

    case "UPDATE_TODO":
      return state.map((todo, index) => {
        if (index === action.payload.index) {
          return action.payload.updatedTodo;
        } else {
          return todo;
        }
      });

    default:
      return state;
  }
}
export const todoContext = createContext()

const App = () => {
  const [state, dispatch] = useReducer(todoReducer, [])

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
