import './App.css';
import { useEffect, useCallback, useReducer, useState } from 'react';
import styles from './App.module.css';
import TodosPage from './pages/TodosPage';
import Header from './shared/Header';
import { useLocation, Routes, Route } from 'react-router-dom';

import About from './pages/About';
import NotFound from './pages/NotFound';

import {
  reducer as todosReducer,
  actions as todoActions,
  initialState as initialTodosState,
} from './reducers/todos.reducer';

function App() {
  const [todoState, dispatch] = useReducer(todosReducer, initialTodosState);

  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  const encodeUrl = useCallback(() => {
    let sortQuery = `sort[0][field]=${todoState.sortField}&sort[0][direction]=${todoState.sortDirection}`;
    let searchQuery = '';

    if (todoState.queryString) {
      searchQuery = `&filterByFormula=SEARCH("${todoState.queryString}",+title)`;
    }

    return encodeURI(`${url}?${sortQuery}${searchQuery}`);
  }, [
    todoState.sortField,
    todoState.sortDirection,
    todoState.queryString,
    url,
  ]);

  useEffect(() => {
    const fetchTodos = async () => {
      dispatch({ type: todoActions.fetchTodos });
      const options = { method: 'GET', headers: { Authorization: token } };
      try {
        const resp = await fetch(encodeUrl(), options);
        if (!resp.ok) {
          throw new Error(resp.message);
        }
        const response = await resp.json();
        dispatch({
          type: todoActions.loadTodos,
          records: response.records,
        });
      } catch (error) {
        dispatch({ type: todoActions.setLoadError, error });
      }
    };
    fetchTodos();
  }, [encodeUrl, token]);

  const addTodo = async (newTodo) => {
    const payload = {
      records: [
        {
          fields: {
            title: newTodo.title,
            isCompleted: newTodo.isCompleted,
          },
        },
      ],
    };
    const options = {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    try {
      dispatch({ type: todoActions.startRequest });
      const resp = await fetch(encodeUrl(), options);

      if (!resp.ok) {
        throw new Error(resp.message);
      }
      const { records } = await resp.json();
      dispatch({
        type: todoActions.addTodo,
        record: {
          id: records[0].id,
          ...records[0].fields,
        },
      });
    } catch (error) {
      dispatch({
        type: todoActions.setLoadError,
        error,
      });
    } finally {
      dispatch({ type: todoActions.endRequest });
    }
  };

  const completeTodo = async (id) => {
    const originalTodo = todoState.todoList.find((todo) => todo.id === id);
    const completedTodo = { ...originalTodo, isCompleted: true };
    const payload = {
      records: [
        {
          id: completedTodo.id,
          fields: {
            title: completedTodo.title,
            isCompleted: completedTodo.isCompleted,
          },
        },
      ],
    };

    const options = {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    try {
      dispatch({
        type: todoActions.completeTodo,
        id,
      });

      const resp = await fetch(encodeUrl(), options);

      if (!resp.ok) {
        throw new Error(resp.message);
      }
    } catch (error) {
      dispatch({
        type: todoActions.revertTodo,
        editedTodo: originalTodo,
        error,
      });
    }
  };

  const updateTodo = async (editedTodo) => {
    const originalTodo = todoState.todoList.find(
      (todo) => todo.id === editedTodo.id
    );

    const payload = {
      records: [
        {
          id: editedTodo.id,
          fields: {
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted,
          },
        },
      ],
    };

    const options = {
      method: 'PATCH',
      headers: { Authorization: token, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    };

    try {
      dispatch({
        type: todoActions.updateTodo,
        editedTodo,
      });

      const resp = await fetch(encodeUrl(), options);

      if (!resp.ok) {
        throw new Error(resp.message);
      }
    } catch (error) {
      dispatch({
        type: todoActions.revertTodo,
        editedTodo: originalTodo,
        error,
      });
    }
  };

  const location = useLocation();
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (location.pathname === '/') {
      setTitle('Todo List');
    } else if (location.pathname === '/about') {
      setTitle('About');
    } else {
      setTitle('Not Found');
    }
  }, [location]);

  return (
    <div className={styles.appContainer}>
      <div className={styles.appContent}>
        <Header title={title} />

        <Routes>
          <Route
            path="/"
            element={
              <TodosPage
                todoState={todoState}
                addTodo={addTodo}
                completeTodo={completeTodo}
                updateTodo={updateTodo}
                setSortField={(value) =>
                  dispatch({ type: todoActions.setSortField, sortField: value })
                }
                setSortDirection={(value) =>
                  dispatch({
                    type: todoActions.setSortDirection,
                    sortDirection: value,
                  })
                }
                setQueryString={(value) =>
                  dispatch({
                    type: todoActions.setQueryString,
                    queryString: value,
                  })
                }
              />
            }
          />

          <Route path="/about" element={<About />} />

          <Route path="*" element={<NotFound />} />
        </Routes>

        {todoState.errorMessage && (
          <div className={styles.errorBox}>
            <p>{todoState.errorMessage}</p>
            <button onClick={() => dispatch({ type: todoActions.clearError })}>
              Dismiss Error Message
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
