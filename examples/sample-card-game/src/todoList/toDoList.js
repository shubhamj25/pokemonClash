import '../App.scss'
import { useState } from 'react'
const ToDoList = ({ tasks, createTask,toggleCompleted }) => {
  const [task, setTask] = useState('New Task')
  return <div id="content">
    <form onSubmit={(e) => {
      e.preventDefault()
      createTask(task)
    }}>
      <input id="newTask"  type="text" onChange={(e) => setTask(e.currentTarget.value)} className="form-control" placeholder="Add task..." required />
      <input type="submit" hidden={false} />
    </form>
    <ul id="taskList" className="list-unstyled">
      {tasks.map((task, key) => {
        return (
          <div className="taskTemplate checkbox" key={key}>
            <label>
              <input type="checkbox" checked={task.completed} onChange={(e) => toggleCompleted(task.id)} />
              <span className="task-content">{task.content}</span>
            </label>
          </div>
        )
      })}
    </ul>
    <ul id="completedTaskList" className="list-unstyled">
    </ul>
  </div>
}

export default ToDoList