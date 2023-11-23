const mongoose = require ('mongoose')
const TelefoneSchema = require('./telefone')

const User = mongoose.model('User', {
    id: String,
    data_criacao: Date,
    data_atualizacao: Date,
    ultimo_login: Date,
    nome: String,
    email: String,
    senha: String,
    telefones:  [TelefoneSchema]
})

module.exports = User