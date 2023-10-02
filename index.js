import express from 'express'
import 'dotenv/config'
import dbConnect from './src/config/dbConnect'
import authRouter from './src/routes/authRouter'
const app = express()
const port = process.env.PORT || 3333

dbConnect()
app.use(express.json())
app.get('/', (req, res) => {
    res.json({ mensagem: 'hello world' })
})

app.use('/api/user', authRouter)
app.listen(port, () => {
    console.log(`api rodando na porta ${port}`)
})
