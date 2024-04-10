import { LuListTodo } from "react-icons/lu";
import {
  IoListCircleOutline,
  IoCheckmarkDoneCircleOutline,
} from "react-icons/io5";
import { MdDeleteSweep, MdEdit } from "react-icons/md";
import { useContext } from "react";
import { todoContext } from "../App";
import { useFetch } from "../hooks/useFetch";

const Todos = () => {
  const { dispatch, state: todos } = useContext(todoContext);
  const { error, isLoading } = useFetch("http://localhost:8080/todos");

  return (
    <div className="todos">
      <h3>
        <LuListTodo />
        Todos
      </h3>
      <ul>
        {todos.length === 0 && !isLoading && (
          <div>No todos found</div>
        )}
        {error && (
          <div>{error}</div>
        )}
        {isLoading && <div>Loading...</div>}
        {todos.length !== 0 &&
          todos.map((todo, index) => (
            <li key={index}>
              <div>
                <IoListCircleOutline />
                <span>{todo.todo}</span>
              </div>
              <div>
                <button>
                  <IoCheckmarkDoneCircleOutline />
                </button>
                <button>
                  <MdEdit />
                </button>
                <button>
                  <MdDeleteSweep />
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Todos;
