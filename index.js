const express = require('express')
require('dotenv').config()
const dbConnect = require('./src/config/dbConnect')
const authRouter = require('./src/routes/authRouter')
const bodyParser = require('body-parser')
const { notfound, errorHandler } = require('./src/middlewares/error')
const cookieParser = require('cookie-parser')
const app = express()
const port = process.env.PORT || 3333

dbConnect()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api/user', authRouter)

app.use(notfound)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`api rodando na porta ${port}`)
})
