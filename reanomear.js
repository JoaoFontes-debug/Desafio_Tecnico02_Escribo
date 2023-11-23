/*const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const app = express()
//permite lermos arquivos json
app.use(express.json())

//models
const User = require('./models/User')

//rota inicial= home page
app.get("/", (req, res) => {
    res.status(200).json({ mensagem: "Bem vindo!" });

});




//registrar/ criar usuario
app.post('/signup', async(req, res) => {
    const {name, email, password, phoneNumber} = req.body
    //validations 
    
    //verificando se o email ja exite
    const userExist = await User.findOne({email})

    if(userExist){
        return res.status(400).json({
            mensagem: 'Email já cadastrado!'
        })

    }
    if(!userExist){
        return res.status(401).json({
            statusCode: 401,
            mensagem: 'Usuário inválidos'
        })
    }
    //cria a senha criptografada
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)
    //compara as senhas 
    const validationPassword = bcrypt.compare(req.body.password, user.password)
    console.log(req.body.password)

    if(!validationPassword){
        return res.status(401).json({
            statusCode: 401,
            mensagem:'senha inválidos'})
    }


    const user = new User({
        name,
        email,
        password: passwordHash,
        phoneNumber
    })

    try{
        await user.save()
        res.status(201).json({
            mensagem: 'Conta criada com sucesso'})

    }catch(error){

        console.log(error)
        res.status(500).json({
            mensagem: 'Erro no servidor'})

    }






})

//conecanto com o banco de dados
mongoose.connect("mongodb+srv://jhenrykings:VvoIHwa4DOOfF4xg@cluster0.cywukdm.mongodb.net/?retryWrites=true&w=majority").then(() => { 
    app.listen(3000)
    console.log('Conexão com o banco estabelecida!')
}).catch((err) => console.log(err))

*/