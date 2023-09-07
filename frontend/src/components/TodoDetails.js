import { useTodosContext } from "../hooks/useTodosContext"
import { useAuthContext } from "../hooks/useAuthContext"

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const TodoDetails = ({ todo }) => {
    const { dispatch } = useTodosContext()
    const { user } = useAuthContext()

    const handleClick = async () => {
        if (!user) {
            return
        }

        //Sends DELETE request to database -> to delete todo item
        const response = await fetch('/api/todos/' + todo._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_TODO', payload: json})
        }
    }

    return (
        <div className="todo-details">
            <h4>{todo.task}</h4>
            <p><strong>Deadline (MM/DD/YYYY): </strong>{todo.deadline}</p>
            {todo.description ? <p><strong>Description: </strong>{todo.description}</p> : <p>No Description</p>}
            <p>{formatDistanceToNow(new Date(todo.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default TodoDetails