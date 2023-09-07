const mongoose = require('mongoose')

const Schema = mongoose.Schema

//Defines what a todo item is -> defines structure of what a todo item is (defines structure of todo collection)
const todoSchema = new Schema({
    task: {
        type: String,
        required: true
    },
    deadline: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    user_id: {
        type: String,
        required: true
    }
    // CreatedDate: {
    //     type: String,
    //     default: new Date().getMonth() + '-' + new Date().getDate() + '-' + new Date().getFullYear()
    // }
}, {timestamps: true})
// timestamps keeps track of when a todo item is created/updated

//Creates model for a todo item (for the todo item collection)
module.exports = mongoose.model('Todo', todoSchema)

