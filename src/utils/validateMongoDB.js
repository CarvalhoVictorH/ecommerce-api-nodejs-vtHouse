const mongoose = require('mongoose')
const validateID = (id) => {
    const isValid = mongoose.Types.ObjectId.isValid(id)
    if (!isValid) {
        throw new Error('ID inválido ou não encontrado.')
    }
}

module.exports = validateID
