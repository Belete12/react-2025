import "./App.css";
import {useState} from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";


function App() {
  const todos = [
    { id: 1, title: "review resources" },
    { id: 2, title: "take notes" },
    { id: 3, title: "code out app" },
  ];

  const [newTodo, setNewTodo] = useState("Todo list Items")

  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm />
      <p>{newTodo}</p>
      <TodoList todos={todos} />
    </div>
  );
}

export default App;
