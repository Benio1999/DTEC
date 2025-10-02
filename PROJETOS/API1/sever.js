//CARREGAR ARQUIVOS AMBIENTE
require('dotenv').config()

//importanto express
const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3005;
const mongoURI = process.env.MONGO_URI;

//CONEXÃO MONGODB
mongoose.connect(mongoURI)
    .then(() => console.log("Conectado ao MonDb Atlas"))
    .catch(error => {
        console.error("Falha na Conexão ao MongoDB", error.message);
        process.exit(1);
    })


//ESTRUTURA DO DOCUMENTO
const usuarioSchema = new mongoose.Schema(
    {
        nome: { type: String, required: true },
        idade: { type: Number, required: true }
    }, { timestamps: true }
);

//MODELO E COLLECTION
const Usuario = mongoose.model('Usuario', usuarioSchema)

//importação cors
const cors = require('cors')

//criando minha aplicação
const app = express();

//permitir trabalhar com json
app.use(express.json());
//permitir trabalhar com cors
app.use(cors())

app.get('/', (req, res) => {
    res.send("PÁGINA INICIAL")
})

app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await Usuario.find({});
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao buscar usuários", erro: error.message })
    }
})

app.get('/usuarios/:id', async (req, res) => {
    try { 
        const id = req.params.id;
        const usuario = await Usuario.findById(id);

        if(usuario){
            res.json(usuario)
        } else{
            res.status(404).json({mensagem: "Usuário não encontrado"})
        }
    } catch (error) {
        res.status(400).json({mensagem: "Erro de Servidor", erro: error.message})
    }
})

app.get('/usuarios/nome/:nome', (req, res) => {
    const buscarNome = req.params.nome.toLowerCase();
    const resultado = usuarios.filter(u => u.nome.toLowerCase().includes(buscarNome));
    if (resultado.length > 0) {
        res.json(resultado)
    } else {
        res.status(404).json({ mensagem: "Usuário não encontrado" })
    }
})

app.delete('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    usuarios = usuarios.filter(u => u.id != id)
    res.json({ mensagem: "Usuário removido com sucesso!" })
})

app.post("/usuarios", (req, res) => {
    const ultimoId = usuarios.reduce((max, usuario) => Math.max(max, usuario.id), 0)

    const novoUsuario = {
        id: ultimoId + 1,
        nome: req.body.nome,
        idade: req.body.idade
    };
    usuarios.push(novoUsuario)
    res.status(201).json(usuarios)
})

app.put('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    const nome = req.body.nome;
    const idade = req.body.idade;
    const usuario = usuarios.find(u => u.id == id);
    if (!usuario) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" })
    }
    usuario.nome = nome || usuario.nome
    usuario.idade = idade || usuario.idade
    res.json(usuario)
})

app.get('/usuarios/idade/:idade', (req, res) => {
    const buscaIdade = req.params.idade;
    const resultado = usuarios.filter(u => u.idade == buscaIdade);
    if (resultado.length > 0) {
        res.json(resultado)
    } else {
        res.status(404).json({ mensagem: "Usuário não encontrado" })
    }
})

//Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor na porta ${PORT}`)
})