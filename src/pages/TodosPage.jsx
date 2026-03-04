import TodoForm from '../features/TodoForm';
import TodoList from '../features/TodoList/TodoList';
import TodosViewForm from '../features/TodosViewForm';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function TodosPage({
  todoState,
  addTodo,
  completeTodo,
  updateTodo,
  setSortField,
  setSortDirection,
  setQueryString,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const itemsPerPage = 15;
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const indexOfFirstTodo = (currentPage - 1) * itemsPerPage;
  const paginatedTodos = todoState.todoList.slice(
    indexOfFirstTodo,
    indexOfFirstTodo + itemsPerPage
  );
  const totalPages = Math.ceil(todoState.todoList.length / itemsPerPage);

  function handlePreviousPage() {
    if (currentPage > 1) {
      setSearchParams({ page: currentPage - 1 });
    }
  }

  function handleNextPage() {
    if (currentPage < totalPages) {
      setSearchParams({ page: currentPage + 1 });
    }
  }

  useEffect(() => {
    if (totalPages > 0) {
      if (isNaN(currentPage) || currentPage < 1 || currentPage > totalPages) {
        navigate('/');
      }
    }
  }, [currentPage, totalPages, navigate]);

  return (
    <div className="todosPageContainer">
      <TodoForm onAddTodo={addTodo} isSaving={todoState.isSaving} />

      <TodoList
        todoList={paginatedTodos}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        isLoading={todoState.isLoading}
      />

      <div className="paginationControls">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

      <div className="searchContainer">
        <TodosViewForm
          sortField={todoState.sortField}
          setSortField={setSortField}
          sortDirection={todoState.sortDirection}
          setSortDirection={setSortDirection}
          queryString={todoState.queryString}
          setQueryString={setQueryString}
        />
      </div>
    </div>
  );
}

export default TodosPage;
