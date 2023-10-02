const User = require('../models/userModels')
const asyncHandler = require('express-async-handler')

const registerUser = asyncHandler(async (req, res) => {
    const email = req.body.email
    const findUser = await User.findOne({ email: email })

    if (!findUser) {
        const newUser = await User.create(req.body)
        res.json(newUser)
    } else {
        throw new Error('Usuário já existe!')
    }
})

const updateUser = async (req, res) => {}

module.exports = { registerUser }
