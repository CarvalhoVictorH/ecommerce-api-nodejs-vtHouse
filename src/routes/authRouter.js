const { registerUser } = require('../controllers/userController')

const express = require('express')
const router = express.Router()

router.post('/registrar', registerUser)

module.exports = router
