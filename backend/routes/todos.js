const express = require('express')
const {
    getTodos,
    getTodo,
    createTodo,
    deleteTodo,
    updateTodo
} = require('../controllers/todoController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

// GET all todos
router.get('/', getTodos)

// GET a single todo item
router.get('/:id', getTodo)

// POST a new todo item
router.post('/', createTodo)

// DELETE a todo item
router.delete('/:id', deleteTodo)

// UPDATE a todo item
router.patch('/:id', updateTodo)


module.exports = router