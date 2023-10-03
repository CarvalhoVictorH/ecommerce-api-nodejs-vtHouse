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
                const user = User.findById(decoded?.id)
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

module.exports = { authMiddleware }
