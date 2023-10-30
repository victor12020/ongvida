const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
const port = 3000;

mongoose.connect("mongodb://127.0.0.1:27017/dbvida", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UsuarioSchema = new mongoose.Schema({
  nome: { type: String },
  email: { type: String, required: true },
  endereco: { type: String },
  numero: { type: Number },
  cep: { type: String, required: true },
  nascimento: { type: Date, required: true },
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);

app.post("/cadastroUsuario", async (req, res) => {
  const nome = req.body.nome;
  const email = req.body.email;
  const endereco = req.body.endereco;
  const numero = req.body.numero;
  const cep = req.body.cep;
  const nascimento = req.body.nascimento;

  const usuario = new Usuario({
    nome: nome,
    email: email,
    endereco: endereco,
    numero: numero,
    cep: cep,
    nascimento: nascimento,
  });

  try {
    const newUsuario = await usuario.save();
    res.json({
      error: null,
      msg: "Cadastro OK",
      UsuarioId: newUsuario._id,
    });
  } catch (error) {}
});

app.get("/", async (res, req) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
