import { useRef } from "react";

function TodoForm({onAddTodo}){
  //Invoke useRef in the body of the component with an empty string and assign it to a const, todoTitleInput.
const todoTitleInput = useRef("");

const handleAddTodo = (event) => {
  event.preventDefault();
  const title = event.target.title.value;
  onAddTodo(title);
  event.target.title.value = "";
  //Finally, at the end of the event handler, we need to reference the current property on the ref and then chain on a focus() method. It will look something like: todoTitleInput.current.focus();
  todoTitleInput.current.focus();
};

    return(
        <form onSubmit={handleAddTodo}>
      <label> 
        Todo:
        <input type="text" name="title" ref={todoTitleInput} />
      </label>
        <button type="submit"> Add Todo</button>
        

        </form>
    )
}
export default TodoForm;