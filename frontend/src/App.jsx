import { useState } from "react";
import "./App.css";


function App() {

  const [task, setTask] = useState("");

  const [todos, setTodos] = useState([]);


  const addTask = () => {

    if(task.trim() === "") return;


    const newTodo = {

      id: Date.now(),

      text: task,

      completed: false

    };


    setTodos([...todos, newTodo]);

    setTask("");

  };


  const completeTask = (id) => {

    setTodos(
      todos.map(todo =>
        todo.id === id
        ? {...todo, completed: !todo.completed}
        : todo
      )
    );

  };


  const deleteTask = (id) => {

    setTodos(
      todos.filter(todo => todo.id !== id)
    );

  };


  return (

    <div className="app-wrapper">

      <div className="container">


        <h1>
          Do.Now
        </h1>


        <div className="input-box">

          <input

            type="text"

            placeholder="Enter your task"

            value={task}

            onChange={(e)=>setTask(e.target.value)}

          />


          <button onClick={addTask}>

            Add 

          </button>


        </div>



        <ul>

          {todos.map(todo => (

            <li
  key={todo.id}
  className={todo.completed ? "completed" : ""}
>

  <span>
    {todo.text}
  </span>


              <button
                onClick={()=>completeTask(todo.id)}
              >

                ✓

              </button>



              <button
                onClick={()=>deleteTask(todo.id)}
              >

                Delete

              </button>


            </li>

          ))}


        </ul>


      </div>


    </div>

  );

}


export default App;