const User = require('../models/userModels')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const authMiddleware = asyncHandler(async (req, res, next) => {
    let token
    if (req?.headers?.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
        try {
            if (token) {
                const decoded = jwt.verify(token, process.env.SECRET_KEY)
                const user = await User.findById(decoded?.id)
                req.user = user
                next()
            }
        } catch (error) {
            throw new Error(
                'Não autorizado token expirado, Por Favor faça login novamente!'
            )
        }
    } else {
        throw new Error('token inválido')
    }
})

const isAdmin = asyncHandler(async (req, res, next) => {
    const { email } = req.user
    const admin = await User.findOne({ email })
    if (admin.role !== 'admin') {
        throw new Error('Não autorizado, apenas administrator !')
    } else {
        next()
    }
})
module.exports = { authMiddleware, isAdmin }
