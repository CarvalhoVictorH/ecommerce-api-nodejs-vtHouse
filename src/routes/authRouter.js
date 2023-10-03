const { registerUser, userLogin } = require('../controllers/userController')

const express = require('express')
const router = express.Router()

router.post('/registrar', registerUser)
router.post('/login', userLogin)

module.exports = router
