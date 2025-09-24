

//importanto express
const express = require('express');


//importação cors
const cors = require('cors')

//criando minha aplicação
const app = express();

//permitir trabalhar com json
app.use(express.json());
//permitir trabalhar com cors
app.use(cors())

//porta onde a API vai rodar
const PORT = 3001;

let usuarios = [
    { id: 1, nome: "Ana", idade: 25 },
    { id: 2, nome: "Carlos", idade: 60 },
    { id: 3, nome: "Mario", idade: 500 },
    { id: 4, nome: "Mario Luigi", idade: 25 }
]

app.get('/', (req, res) => {
    res.send("PÁGINA INICIAL")
})

app.get('/usuarios', (req, res) => {
    res.json(usuarios);
})

app.get('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    const usuario = usuarios.find(u => u.id == id);
    if (usuario) {
        res.json(usuario)
    } else {
        res.status(404).json({ mensagem: "Usuário não encontrado" })
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
        id: ultimoId  + 1,
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