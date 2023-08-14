const Todo = require('../models/todoModel')
const mongoose = require('mongoose')

// get all todo items
const getTodos = async (req, res) => {
    // finds all todo items, since nothing is passed through curly braces
    // sorts all items in descending order based on when they were created (-1, means descending)
    // YOU CAN CHANGE THIS LATER TO SORT THEM BASED ON DEADLINE OR OTHER METRICS
    const todos = await Todo.find({}).sort({createdAt: -1}) 

    res.status(200).json(todos) 

    //res.json({mssg: 'GET all todos'})
}

// get a single todo item
const getTodo = async (req, res) => {
    // all request parameters are stored in req.params
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Todo item doesn't exist"})
    }

    const todo = await Todo.findById(id)

    if (!todo) {
        return res.status(400).json({error: "Todo item doesn't exist"})
    }

    res.status(200).json(todo)

    //res.json({mssg: 'GET a single todo'})
}


// create a new todo item
const createTodo = async (req, res) => {
    const {task, deadline, description} = req.body

    let emptyFields = []

    if(!task) {
        emptyFields.push('task')
    }
    if(!deadline) {
        emptyFields.push('deadline')
    }
    //You can add more checks if you have any more required fields (description is not required so it doesn't need to be checked)

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields})
    }

    // creating a document in the database (for the todo item)
    try {
        const todo = await Todo.create({task, deadline, description})
        res.status(200).json(todo)
    } catch (error) {
        res.status(400).json({error: error.message})
    }

    // res.json({mssg: 'POST a new todo'})
}

// delete a todo item
const deleteTodo = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Todo item doesn't exist"})
    }

    const todo = await Todo.findOneAndDelete({_id: id})

    if (!todo) {
        return res.status(400).json({error: "Todo item doesn't exist"})
    }

    res.status(200).json(todo)

    //res.json({mssg: 'DELETE a todo item'})
}

// update a todo item
const updateTodo = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Todo item doesn't exist"})
    }

    const todo = await Todo.findOneAndUpdate({_id: id}, {
        ...req.body //Spreads out all the properties that are passed through the request, just in allow for variability in what is updated
    })

    if (!todo) {
        return res.status(400).json({error: "Todo item doesn't exist"})
    }

    res.status(200).json(todo)

    //res.json({mssg: 'UPDATE a todo item'})
}


module.exports = {
    getTodos,
    getTodo,
    createTodo,
    deleteTodo,
    updateTodo
}