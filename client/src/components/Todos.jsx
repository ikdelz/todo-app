import { LuListTodo } from "react-icons/lu";
import {
  IoListCircleOutline,
  IoCheckmarkDoneCircleOutline,
} from "react-icons/io5";
import { MdDeleteSweep, MdEdit } from "react-icons/md";
import { useContext } from "react";
import { todoContext } from "../App";

const Todos = () => {
  const { dispatch, state: todos } = useContext(todoContext);

  return (
    <div className="todos">
      <h3>
        <LuListTodo />
        Todos
      </h3>
      <ul>
        {todos.length === 0 && (
          <div>No todos found</div>
        )}
        {todos.length !== 0 &&
          todos.map((todo, index) => (
            <li>
              <div>
                <IoListCircleOutline />
                <span>{todo}</span>
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
