//MAKE SURE TO IGNORE THE .ENV file for gitignore (these variable values should be protected/hidden)
//Allows us to call environment variables using package dotenv
require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const todosRoutes = require('./routes/todos')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/todos', todosRoutes)

// connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests (specific port number)
        app.listen(process.env.PORT, () => {
            console.log('connected to db and listening on port ' + process.env.PORT)
            //^^ You can use process.env.variableName to get/call any variable in the .env file
        })
    })
    .catch((error) => {
        //Error is thrown usually when URI is incorrect or when username/password in URI is wrong
        console.log(error)
    })

