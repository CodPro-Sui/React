import {useEffect} from 'react'
import TaskInfo from './TaskInfo'

function AppendTask({tasksData, dl, fndone}) {
  if(tasksData.length === 0){
    return <p id='empty'>No Tasks yet <i className="fa-regular fa-face-sad-tear"></i></p>
  }
  return (
    <div className='tasks'>
        <TaskInfo Data={tasksData} deleteItem={dl} dd={fndone}/>
    </div>
  )
}

export default AppendTask