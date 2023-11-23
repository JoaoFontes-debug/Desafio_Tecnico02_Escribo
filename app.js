const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET } = process.env;
const secret = SECRET;

const app = express();

app.use(express.json());

const User = require("./models/User");

app.get("/:id", verifyToken, async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id, "-senha");

    if (!user) {
      return res.status(404).json({
        mensagem: "Usuário inválido",
      });
    } else {
      return res.status(200).json({
        user,
      });
    }
  } catch (error) {
    console.error("Erro no servidor");
    return res.status(500).json({
      mensagem: "Erro interno",
    });
  }
});

function verifyToken(req, res, next) {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      mensagem: "Não autorizado",
    });
  }

  try {
    const senhaTeste = SECRET;
    jwt.verify(token, senhaTeste);

    next();
  } catch (error) {
    console.error("Erro ao verificar token", error);
    res.status(401).json({
      mensagem: "sessão inválida",
    });
  }
}

app.post("/signup", async (req, res) => {
  const { nome, email, senha, telefones } = req.body;
  const userExist = await User.findOne({ email });

  if (userExist) {
    return res.status(400).json({
      statusCode: 400,
      mensagem: "Email já cadastrado!",
    });
  }

  const hashedsenha = await bcrypt.hash(senha, 10);
  req.body.senha = hashedsenha;

  const newUser = new User({
    nome,
    email,
    senha: hashedsenha,
    telefones,
    data_criacao: new Date(),
    data_atualizacao: new Date(),
    ultimo_login: new Date(),
  });

  try {
    const result = await newUser.save();

    res.status(201).json({
      id: result._id,
      data_criacao: result.data_criacao,
      data_atualizacao: result.data_atualizacao,
      ultimo_login: result.ultimo_login,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      mensagem: "Erro no servidor",
    });
  }
});

app.post("/sigin", async (req, res) => {
  const { email, senha } = req.body;
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(401).json({
      statusCode: 401,
      mensagem: "Usuario e / ou inválidos",
    });
  }

  const validationsenha = await bcrypt.compare(senha, user.senha);

  if (!validationsenha) {
    return res.status(401).json({
      statusCode: 401,
      mensagem: "Usuario e / ou senha inválidos",
    });
  }

  try {
    const token = jwt.sign(
      {
        id: user._id,
      },
      secret,
      {
        expiresIn: "30m",
      }
    );

    res.status(200).json({
      id: user._id,
      data_criacao: user.data_criacao,
      data_atualizacao: user.data_atualizacao,
      ultimo_login: user.ultimo_login,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      mensagem: "Erro no sesrvidor",
    });
  }
});

mongoose
  .connect(
    "mongodb+srv://jhenrykings:VvoIHwa4DOOfF4xg@cluster0.cywukdm.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(3000);
    console.log("Conexão com o banco estabelecida!");
  })
  .catch((err) => console.log(err));
