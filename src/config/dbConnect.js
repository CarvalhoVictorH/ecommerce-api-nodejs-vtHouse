import mongoose from 'mongoose'

const dbConnect = () => {
    try {
        const connect = mongoose.connect(process.env.DBMONGO_URL)
        console.log('Db Connected')
    } catch (error) {
        console.log(error)
    }
}

export default dbConnect
