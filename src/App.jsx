import './App.css';
import { useState, useEffect } from 'react';

import TodoForm from './features/TodoForm';
import TodoList from './features/TodoList/TodoList';

function App() {
  const [todoList, setTodoList] = useState([]);

  //stablish Transition State
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  {
    /*extract from App.jsx*/
  }
  {
    /*...code*/
  }
  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      const options = {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      };
      try {
        const resp = await fetch(url, options);

        if (!resp.ok) {
          throw new Error(resp.message);
        }

        const response = await resp.json();
        const fetchedTodos = response.records.map((record) => {
          const todo = { id: record.id, ...record.fields };
          if (!todo.isCompleted) {
            todo.isCompleted = false;
          }
          return todo;
        });
        setTodoList(fetchedTodos);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = (title) => {
    const newTodo = {
      title: title,
      id: Date.now(),
      isCompleted: false,
    };
    setTodoList([...todoList, newTodo]);
  };
  //set new completetodo handler functions
  const completeTodo = (id) => {
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: true };
      }
      return todo;
    });
    setTodoList(updatedTodos);
  };

  //updateTodo handler
  const updateTodo = (editedTodo) => {
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === editedTodo.id) {
        return { ...editedTodo };
      }
      return todo;
    });
    setTodoList(updatedTodos);
  };

  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        isLoading={isLoading}
      />
      {errorMessage && (
        <div>
          <hr />
          <p> {errorMessage}</p>
          <button onClick={() => setErrorMessage('')}> Dismiss</button>
        </div>
      )}
    </div>
  );
}

export default App;
