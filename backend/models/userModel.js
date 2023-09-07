const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
})

// static signup method
userSchema.statics.signup = async function(email, password) {
    // Validation (validates username and password)
    if (!email || !password) {
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error("Invalid Email")
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong')
    }

    const exists = await this.findOne({ email })

    if (exists) {
        // Since we can't send a response here we just throw errors
        throw Error("Email already exists!")
    }

    //Generating salts (adding string of characters to end of password to make it unmatchable to other passwords that are the same)
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })

    return user
}   

// static login method
userSchema.statics.login = async function(email, password) {

    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })

    if (!user) {
        // Since we can't send a response here we just throw errors
        throw Error("Incorrect Email")
    }
    
    //Checks if password between user input and password stored in db
    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error("Incorrect Password")
    }
    
    return user
}

module.exports = mongoose.model('User', userSchema)