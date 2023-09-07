import { useState } from "react"
import { useTodosContext } from "../hooks/useTodosContext"
import { useAuthContext } from "../hooks/useAuthContext"

const TodoForm = () => {
    const { dispatch } = useTodosContext()
    const { user } = useAuthContext()

    const [task, setTask] = useState('')
    const [deadline, setDeadline] = useState('')
    const [description, setDescription] = useState('') // This will be important later, since descriptions aren't required
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in to submit workouts!')
            return
        }

        const todo = {task, deadline, description}

        //Updating Database
        const response = await fetch('/api/todos', {
            method: 'POST',
            body: JSON.stringify(todo),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setTask('')
            setDeadline('')
            setDescription('')
            setError(null)
            setEmptyFields([])
            console.log('New todo added', json)
            dispatch({type: 'CREATE_TODO', payload: json})
        }
    }

    
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new Task</h3>

            <label>Task Name:</label>
            <input 
                type="text"
                onChange={(e) => setTask(e.target.value)}
                value = {task}
                className={emptyFields.includes('task') ? 'error' : ''}
            />

            <label>Deadline:</label>
            <input 
                type="text"
                onChange={(e) => setDeadline(e.target.value)}
                value = {deadline}
                className={emptyFields.includes('deadline') ? 'error' : ''}
            />

            <label>Description:</label>
            <input 
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value = {description}
            />

            <button>Add Todo Item</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default TodoForm