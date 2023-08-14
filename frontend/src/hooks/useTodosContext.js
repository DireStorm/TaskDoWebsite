import { TodosContext} from '../context/TodoContext';
import { useContext } from 'react'

export const useTodosContext = () => {
    const context = useContext(TodosContext)

    if (!context) {
        throw Error('useTodoContext must be used inside a TodoContextProvider')
    }

    return context
}