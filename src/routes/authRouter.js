const {
    registerUser,
    userLogin,
    listAllUsers,
    listUserById,
    deleteUser,
    updateUser,
} = require('../controllers/userController')

const express = require('express')
const { authMiddleware } = require('../middlewares/authMiddleware')
const router = express.Router()

router.post('/registrar', registerUser)
router.post('/login', userLogin)
router.get('/usuarios', listAllUsers)
router.get('/usuarios/:id', authMiddleware, listUserById)
router.delete('/usuarios/:id', deleteUser)
router.put('/usuarios/:id', updateUser)

module.exports = router
