import { useState, useEffect } from 'react';

import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0.5rem 0;
`;

function TodosViewForm({
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  queryString,
  setQueryString,
}) {
  const preventRefresh = (e) => {
    e.preventDefault();
  };

  const [localQueryString, setLocalQueryString] = useState(queryString);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setQueryString(localQueryString);
    }, 500);

    return () => clearTimeout(debounce);
  }, [localQueryString, setQueryString]);

  return (
    <StyledForm onSubmit={preventRefresh}>
      <div>
        <label>
          search to do:
          <input
            type="text"
            value={localQueryString}
            onChange={(e) => setLocalQueryString(e.target.value)}
          />
        </label>

        <button type="button" onClick={() => setLocalQueryString('')}>
          Clear
        </button>
      </div>

      <div>
        <label>
          Sort by
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
          >
            <option value="title">Title</option>
            <option value="createdTime">Time added</option>
          </select>
        </label>

        <label>
          Direction
          <select
            value={sortDirection}
            onChange={(e) => setSortDirection(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
    </StyledForm>
  );
}

export default TodosViewForm;
