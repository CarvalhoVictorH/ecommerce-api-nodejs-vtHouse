const { generateToken } = require('../config/jwtToken')
const { errorHandler } = require('../middlewares/error')
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

const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const findUser = await User.findOne({ email })
    if (findUser && (await findUser.isPasswordMatched(password))) {
        res.json({
            id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id),
        })
    } else {
        throw new Error('Não autorizado!')
    }
})

const listAllUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        throw new Error(error)
    }
})

const listUserById = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id)
        res.json(user)
    } catch (error) {
        throw new Error(error)
    }
})

const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const updateUser = await User.findByIdAndUpdate(
            id,
            {
                firstname: req?.body?.firstname,
                lastname: req?.body?.lastname,
                email: req?.body?.email,
                mobile: req?.body?.mobile,
            },
            {
                new: true,
            }
        )

        res.json(updateUser)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Erro interno do servidor' })
    }
})

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findByIdAndDelete(id)
        return res.json(user)
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = {
    registerUser,
    userLogin,
    listAllUsers,
    listUserById,
    deleteUser,
    updateUser,
}
