const {
    registerUser,
    userLogin,
    listAllUsers,
    listUserById,
    deleteUser,
    updateUser,
    blockedUser,
    unBlockedUser,
} = require('../controllers/userController')

const express = require('express')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')
const router = express.Router()

router.post('/registrar', registerUser)
router.post('/login', userLogin)
router.get('/usuarios', listAllUsers)
router.get('/usuarios/:id', authMiddleware, isAdmin, listUserById)
router.delete('/usuarios/:id', deleteUser)
router.put('/usuarios/atualizar', authMiddleware, updateUser)
router.put('/bloquear/:id', authMiddleware, isAdmin, blockedUser)
router.put('/desbloquear/:id', authMiddleware, isAdmin, unBlockedUser)

module.exports = router
