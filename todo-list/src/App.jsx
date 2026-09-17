import { useState, useRef } from 'react'
import './App.css'

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTasks, setNewTasks] = useState({message:''});
  const nextId = useRef(1);


  function addTasks(){
    if(newTasks.message.trim() == "") return;
    setTasks(t =>[...t,{id: nextId.current++, ...newTasks}]);
    setNewTasks({ message:''});
  }

  function deleteTask(taskId){
    setTasks(tasks.filter(task => task.id!== taskId ));
  }

  function moveUp(index){
    if(index === 0 ) return;
    const getTasks = [...tasks];
    [getTasks[index-1], getTasks[index]] = [getTasks[index], getTasks[index-1]];
    setTasks(getTasks);
  }

  function moveDown(index){
    if(index === tasks.length -1) return;
    const getTasks = [...tasks];
    [getTasks[index+1], getTasks[index]] = [getTasks[index],getTasks[index+1]];
    setTasks(getTasks);
  
  }

  return (
    <div className="todo-container">
      <h1>To-Do-List</h1>
      <div>
        <input type='text'value ={newTasks.message} 
          onChange={(e)=>{setNewTasks({...newTasks, message:e.target.value})}}
           placeholder='Go to work' />
        <button className="add-btn" onClick={addTasks}>Add</button>
      </div>
      
      <ul className="task-container">
          {tasks.map((task,index)=>
            <li key={task.id}>
              <span className="text">{task.message}</span>
              <button className="delete-btn" onClick={()=> deleteTask(task.id)}>Delete</button>
              <button className="move-btn" onClick={() => moveUp(index)} >Up</button>
              <button className="move-btn" onClick={() => moveDown(index)}>Down</button>
            </li>
          )}
      </ul>
      
    </div>
  )
}

