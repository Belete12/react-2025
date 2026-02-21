import { useRef, useState } from 'react';
import styled from 'styled-components';
import TextInputWithLabel from '../shared/TextInputWithLabel';

const StyledForm = styled.form`
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem 0;
`;

const StyledButton = styled.button`
  padding: 0.4rem 0.8rem;

  &:disabled {
    font-style: italic;
  }
`;

function TodoForm({ onAddTodo, isSaving }) {
  const todoTitleInput = useRef('');
  const [workingTodoTitle, setWorkingTodoTitle] = useState('');

  const handleAddTodo = (event) => {
    event.preventDefault();
    onAddTodo({ title: workingTodoTitle, isCompleted: false });
    setWorkingTodoTitle('');

    todoTitleInput.current.focus();
  };

  return (
    <StyledForm onSubmit={handleAddTodo}>
      <TextInputWithLabel
        elementId="todotitle"
        labelText="Todo:"
        ref={todoTitleInput}
        value={workingTodoTitle}
        onChange={(e) => setWorkingTodoTitle(e.target.value)}
      />

      <StyledButton disabled={workingTodoTitle.trim() === ''}>
        {isSaving ? 'Saving...' : 'Add Todo'}
      </StyledButton>
    </StyledForm>
  );
}
export default TodoForm;
