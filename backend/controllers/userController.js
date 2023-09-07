const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

// creating jwt
const createToken = (_id) => {
    // User remains logged in for 3 days
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d'}) // {payload, secret} (payload must be nonsensitive info -> no passwords)
}

// login user
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }

    // res.json({mssg: 'login user'})
}

// signup user
const signupUser = async (req, res) => {
    const {email, password} = req.body
    
    try {
        const user = await User.signup(email, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }

    // res.json({mssg: 'signup user'})
}

module.exports = { loginUser, signupUser }