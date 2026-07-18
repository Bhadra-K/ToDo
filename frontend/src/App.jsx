import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";


function App() {

  const [task, setTask] = useState("");

  const [todos, setTodos] = useState([]);


  const API = "http://localhost:5000";


  // Get tasks from backend
  const getTodos = async () => {

    const response = await axios.get(`${API}/todos`);

    setTodos(response.data);

  };


  // Add task
  const addTask = async () => {

    if(task.trim() === "") return;


    await axios.post(`${API}/todos`, {

      text: task

    });


    setTask("");

    getTodos();

  };


  // Complete task
  const completeTask = async (id) => {

    await axios.put(`${API}/todos/${id}`);

    getTodos();

  };


  // Delete task
  const deleteTask = async (id) => {

    await axios.delete(`${API}/todos/${id}`);

    getTodos();

  };


  useEffect(()=>{

    getTodos();

  },[]);



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


          {todos.map(todo=>(


            <li

              key={todo.id}

              className={
                todo.completed
                ? "completed"
                : ""
              }

            >


              <span>

                {todo.text}

              </span>



              <button
                onClick={() => completeTask(todo.id)}
              >

                ✓

              </button>



              <button
                onClick={() => deleteTask(todo.id)}
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