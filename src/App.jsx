import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [todos, setTodos] = useState([])
  const [todoName, setTodoName] = useState("")
  const [editId, setEditId] = useState(null)
  console.log(todos.length)

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        return setTodos(data)
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (editId !== null && editId != -1) {

      const updateTodo = todos.map((todo) => {
        return (
          todo.id === editId ? { ...todo, title: todoName } : todo
        )
      })
      setTodos(updateTodo)
      setEditId(null)
    } else {
      const newTodo = {
        id: Date.now(),
        title: todoName,
      }
      setTodos([newTodo, ...todos])
    }

    setTodoName("")
  }

  const handleEdit = (id, title) => {
    setTodoName(title)
    setEditId(id)
  }

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => {
      return (todo.id !== id)
    })
    setTodos(updatedTodos)
  }



  return (

    <div className='App'>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={todoName} onChange={(e) => setTodoName(e.target.value)} placeholder='Enter a todo..' />
        <button type='submit' disabled={todoName === ""}>{(editId !== null) ? "update" : "save"}</button>
      </form>
      {todos.length === 0 ? (
        <p className='message'>Please write something...</p>
      ) : (
        <div className="outer-div">
          <ul >
            {todos.map((todo, index) => {
              return (
                <li key={index}>
                  {todo.title}  <button onClick={() => handleEdit(todo.id, todo.title)}>Edit</button><span onClick={() => handleDelete(todo.id)}>&times;</span>
                </li>
              )
            })}
          </ul>
        </div>
      )}

    </div>
  )
}


export default App




