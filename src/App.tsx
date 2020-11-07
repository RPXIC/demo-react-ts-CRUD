import React, { useState, useRef } from "react"

type FormElement = React.FormEvent<HTMLFormElement>
interface ITask {
  name: string
  done: boolean
}

const App = (): JSX.Element => {
  const [task, setTask] = useState<string>("")
  const [tasks, setTasks] = useState<ITask[]>([])
  const taskInput = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: FormElement) => {
    e.preventDefault()
    addTask(task)
    setTask("")
    taskInput.current?.focus()
  }

  const addTask = (name: string): void => {
    const newTasks: ITask[] = [...tasks, { name, done: false }]
    setTasks(newTasks)
  }

  const toggleDoneTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks]
    newTasks[i].done = !newTasks[i].done
    setTasks(newTasks)
  }

  const deleteTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks]
    newTasks.splice(i, 1)
    setTasks(newTasks)
  }

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  onChange={(e) => setTask(e.target.value)}
                  value={task}
                  className="form-control"
                  ref={taskInput}
                  autoFocus
                />
                <button className="btn btn-success btn-block mt-2">Send</button>
              </form>
            </div>
          </div>
          {tasks.map((t: ITask, i: number) => (
            <div className="card card-body mt-2" key={i}>
              <h2 style={{textDecoration: t.done ? 'line-through' : ''}}>{t.name}</h2>
              <div>
                <button className="btn btn-secondary" onClick={() => toggleDoneTask(i)} >
                  {t.done ? '✓' : 'X'}
                </button>
                <button className="btn btn-danger" onClick={() => deleteTask(i)}>🗑</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
