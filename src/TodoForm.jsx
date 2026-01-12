import { useRef, useState } from "react";

function TodoForm({onAddTodo}){
  //Invoke useRef in the body of the component with an empty string and assign it to a const, todoTitleInput.
const todoTitleInput = useRef("");
const [workingTodoTitle,setWorkingTodoTitle] = useState(""); //create workingTodoTitle variable and assign empty string

const handleAddTodo = (event) => {
  event.preventDefault();
  //const title = event.target.title.value;
  //we use state instead of event trigger
  onAddTodo(workingTodoTitle);
  setWorkingTodoTitle("");
  // onAddTodo(title);
  // event.target.title.value = "";
  
  todoTitleInput.current.focus();
};

    return(
        <form onSubmit={handleAddTodo}>
      <label> 
        Todo:
        <input 
          type="text" 
          name="title" 
          ref={todoTitleInput}
          value ={workingTodoTitle}
          onChange={(e) => setWorkingTodoTitle(e.target.value)}
       />
      </label>
        <button type="submit" disabled ={!workingTodoTitle}> Add Todo</button>
        

        </form>
    )
}
export default TodoForm;