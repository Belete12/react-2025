const actions = {
  //actions in useEffect that loads todos
  fetchTodos: 'fetchTodos',
  loadTodos: 'loadTodos',

  //found in useEffect and addTodo to handle failed requests
  setLoadError: 'setLoadError',

  //actions found in addTodo
  startRequest: 'startRequest',
  addTodo: 'addTodo',
  endRequest: 'endRequest',

  //found in helper functions
  updateTodo: 'updateTodo',
  completeTodo: 'completeTodo',

  //reverts todos when requests fail
  revertTodo: 'revertTodo',

  //action on Dismiss Error button
  clearError: 'clearError',

  //
  setSortDirection: 'setSortDirection',
  setSortField: 'setSortField',
  setQueryString: 'setQueryString',
};

const initialState = {
  todoList: [],
  isLoading: false,
  isSaving: false,
  errorMessage: '',

  //
  sortDirection: 'desc',
  sortField: 'createdTime',
  queryString: '',
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.fetchTodos:
      return {
        ...state,
        isLoading: true,
      };

    case actions.loadTodos:
      return {
        ...state,
        todoList: action.records.map((record) => {
          const todo = { id: record.id, ...record.fields };
          if (!todo.isCompleted) {
            todo.isCompleted = false;
          }
          return todo;
        }),
        isLoading: false,
      };

    case actions.setLoadError:
      return {
        ...state,
        errorMessage: action.error.message,
        isLoading: false,
      };

    case actions.startRequest:
      return {
        ...state,
        isSaving: true,
      };

    case actions.addTodo: {
      const savedTodo = {
        ...action.record,
        isCompleted: action.record.isCompleted ?? false,
      };
      return {
        ...state,
        todoList: [...state.todoList, savedTodo],
        isSaving: false,
      };
    }

    case actions.endRequest:
      return {
        ...state,
        isLoading: false,
        isSaving: false,
      };

    //make sure that the revertTodo case is written directly above updateTodo and remove the return statement.
    case actions.revertTodo:
    // no return
    case actions.updateTodo: {
      const updatedTodos = state.todoList.map((todo) =>
        todo.id === action.editedTodo.id ? action.editedTodo : todo
      );
      const updatedState = {
        ...state,
        todoList: updatedTodos,
      };
      if (action.error) {
        updatedState.errorMessage = action.error.message;
      }
      return updatedState;
    }

    case actions.completeTodo: {
      const updatedTodos = state.todoList.map((todo) =>
        todo.id === action.id
          ? {
              ...todo,
              isCompleted: true,
            }
          : todo
      );

      return {
        ...state,
        todoList: updatedTodos,
      };
    }

    case actions.clearError:
      return {
        ...state,
        errorMessage: '',
      };

    // add
    case actions.setSortDirection:
      return {
        ...state,
        sortDirection: action.sortDirection,
      };

    case actions.setSortField:
      return {
        ...state,
        sortField: action.sortField,
      };

    case actions.setQueryString:
      return {
        ...state,
        queryString: action.queryString,
      };

    default:
      return state;
  }
}

export { initialState, actions, reducer };
