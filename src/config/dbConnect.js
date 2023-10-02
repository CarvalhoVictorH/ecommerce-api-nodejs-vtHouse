const { default: mongoose } = require('mongoose')

const dbConnect = () => {
    try {
        const connect = mongoose.connect(process.env.DBMONGO_URL)
        console.log('Db Connected')
    } catch (error) {
        console.error(error)
    }
}

module.exports = dbConnect
