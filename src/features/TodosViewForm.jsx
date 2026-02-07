function TodosViewForm() {
  return (
    <form>
      <div>
        <label>
          Sort by
          <select>
            <option value="title">Title</option>
            <option value="createdTime">Time added</option>
          </select>
        </label>

        <label>
          Direction
          <select>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
    </form>
  );
}
export default TodosViewForm;
