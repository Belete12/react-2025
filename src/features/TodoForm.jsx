import { useRef, useState } from 'react';

function TodoForm({ onAddTodo }) {
  const todoTitleInput = useRef('');
  const [workingTodoTitle, setWorkingTodoTitle] = useState('');

  const handleAddTodo = (event) => {
    event.preventDefault();
    onAddTodo(workingTodoTitle);
    setWorkingTodoTitle('');

    todoTitleInput.current.focus();
  };

  return (
    <form onSubmit={handleAddTodo}>
      <label>
        Todo:
        <input
          type="text"
          name="title"
          ref={todoTitleInput}
          value={workingTodoTitle}
          onChange={(e) => setWorkingTodoTitle(e.target.value)}
        />
      </label>
      <button type="submit" disabled={!workingTodoTitle}>
        {' '}
        Add Todo
      </button>
    </form>
  );
}
export default TodoForm;
