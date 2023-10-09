const { generateToken } = require('../config/jwtToken')
const { errorHandler } = require('../middlewares/error')
const User = require('../models/userModels')
const asyncHandler = require('express-async-handler')
const validateID = require('../utils/validateMongoDB')
const { generateRefreshToken } = require('../config/refresh-jwt')

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
        const refreshToken = await generateRefreshToken(findUser?._id)
        const updateUser = await User.findByIdAndUpdate(
            findUser.id,
            {
                refreshToken: refreshToken,
            },
            { new: true }
        )
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        })
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
    validateID(id)
    try {
        const user = await User.findById(id)
        res.json(user)
    } catch (error) {
        throw new Error(error)
    }
})

const updateUser = asyncHandler(async (req, res) => {
    const { _id } = req.user
    validateID(_id)
    try {
        const updateUser = await User.findByIdAndUpdate(
            _id,
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

const blockedUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateID(id)

    try {
        const blocked = await User.findByIdAndUpdate(
            id,
            {
                isBlocked: true,
            },
            {
                new: true,
            }
        )
        res.json(blocked)
    } catch (error) {
        throw new Error(error)
    }
})

const unBlockedUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateID(id)
    try {
        const unBlocked = await User.findByIdAndUpdate(
            id,
            {
                isBlocked: false,
            },
            {
                new: true,
            }
        )
        res.json(unBlocked)
    } catch (error) {
        throw new Error(error)
    }
})

const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies
    if (!cookie?.refreshToken) throw new Error('Não há Token nos Cookies')
    const { refreshToken } = cookie
    const user = await User.findOne({ refreshToken }).lean()
    if (!user)
        throw new Error('Não foi possivel encontrar o usuário pelo token')
    res.json(user)
})

module.exports = {
    registerUser,
    userLogin,
    listAllUsers,
    listUserById,
    deleteUser,
    updateUser,
    blockedUser,
    unBlockedUser,
    handleRefreshToken,
}
