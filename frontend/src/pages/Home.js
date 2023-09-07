import { useEffect } from 'react'
import { useTodosContext } from "../hooks/useTodosContext"
import { useAuthContext} from "../hooks/useAuthContext"

// components
import TodoDetails from '../components/TodoDetails'
import TodoForm from '../components/TodoForm'


const Home = () => {
    const {todos, dispatch} = useTodosContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchTodos = async () => {
            //You will need to change this later since the backend won't stay on localhost
            const response = await fetch('/api/todos', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_TODOS', payload: json})
            }
        }

        if (user) {
            fetchTodos()
        }
    }, [dispatch, user])


    return (
        <div className="home">
            <div className="todos">
                {todos && todos.map((todo) => (
                    <TodoDetails key={todo._id} todo={todo}/>
                ))}
            </div>
            <TodoForm />
        </div>
    )
}

export default Home