import './App.css';
import Todolist from './TodoList';
import TodoForm from './TodoForm';

function App() {
  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm />
      <Todolist />
    </div>
  );
}

export default App;
