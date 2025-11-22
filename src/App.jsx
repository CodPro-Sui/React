import { useState, useEffect, useRef } from 'react'
import AppendTask from './AppendTask'
import './App.css'

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() =>{
    let c = localStorage.getItem("save");
    return c?JSON.parse(c):[]
  });
  const taskRef = useRef(null);
  
useEffect(() =>{
localStorage.setItem("save", JSON.stringify(tasks));
},[tasks])

  const handleTask = () => {
    if (!task) return;
    const obj = {
      task,
      id: Date.now(),
      done: false
    }
    setTasks(pre => [...pre,obj]);
    setTask("");
    taskRef.current.focus();
  }

  const deleteItem = (id) => {
    setTasks((pre) => pre.filter(e => e.id !== id))
  }
  const done = (id) => {
    setTasks((pre) =>
      pre.map(t => t.id === id ? { ...t, done: !t.done } : t)
    )
  }
  let completedTask = tasks.filter(t => t.done).length;

  return (
    <div className='main'>
      <h1>Todos Task</h1>
      <div id="addtasks">
        <input
          type="text"
          value={task}
          ref={taskRef}
          placeholder='Add Task'
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit" onClick={handleTask}>Add</button>
      </div>
      <div className='tool'>
        <span className='total'>({tasks.length})</span>
        <span id='complete'>Completed: {completedTask}</span>
      </div>
      <div id='break'><div id='center'></div></div>
      <AppendTask tasksData={tasks} dl={deleteItem} fndone={done} />
    </div>
  )
}

export default App
