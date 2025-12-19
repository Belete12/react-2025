import "./App.css";
import {useState} from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";


function App() {

  //No hardcoded
  // const todos = [
  //   { id: 1, title: "review resources" },
  //   { id: 2, title: "take notes" },
  //   { id: 3, title: "code out app" },
  // ];

  //const [newTodo, setNewTodo] = useState("Todo list Items")
  const [todoList, setTodoList] = useState([]);

const addTodo = (title) => {
  const newTodo = {
    title : title,
    id: Date.now(),
  };
setTodoList([...todoList, newTodo])

}
  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm  onAddTodo={addTodo}/>
      <TodoList todoList={todoList}/>

    </div>
  );
}

export default App;
