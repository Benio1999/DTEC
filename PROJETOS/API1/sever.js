//CARREGAR ARQUIVOS AMBIENTE
require('dotenv').config()

//importanto express
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('./models/User');
const Pessoa = require('./models/Pessoa');

const PORT = process.env.PORT || 3005;
const mongoURI = process.env.MONGO_URI;
const jwt_SECRET = process.env.jwt_SECRET;

//CONEXÃO MONGODB
mongoose.connect(mongoURI)
    .then(() => console.log("Conectado ao MonDb Atlas"))
    .catch(error => {
        console.error("Falha na Conexão ao MongoDB", error.message);
        process.exit(1);
    });

const generateToken = (id) => {
    return jwt.sign({ id }, jwt_SECRET, { expiresIn: '1d' })
}

const protect = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWhith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            jwt.verify(token, jwt_SECRET);
            next()
        } catch (error) {
            return res.status(401).json({ mensagem: "Não autorizado, token inválido" })
        }
    }
}


//importação cors
const cors = require('cors')

//criando minha aplicação
const app = express();

//permitir trabalhar com json
app.use(express.json());
//permitir trabalhar com cors
app.use(cors())

//rotas adm
app.post('/api/register-admin', async (req, res) => {
    const { email, password } = req.body
    try {
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({ mensagem: "Nome de usuário já existe" })
        }
        const user = await User.create({ email, password })
        res.status(201).json({ mensagem: "Usuário criado com sucesso" })
    } catch (error) {
        res.status(500).json({ mensagem: "Erro no registro admin", erro: error.message })
    }
})

app.post('/api/login-admin', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email }).select('+password');

        if (user && (await user.matchPassword(password))) {
            res.json({
                email: user.email,
                token: generateToken(user._id),
                mensagem: "Login realizado com sucesso"
            })
        } else {
            res.status(401).json({mensagem: "Credenciais inválidas"})
        }
    } catch(error) {
        res.status(500).json({mensagem: "Erro no login", erro: error.message})
    }
})

app.get('/', (req, res) => {
    res.send("PÁGINA INICIAL")
});

app.get('/pessoas', async (req, res) => {
    try {
        const usuarios = await Pessoa.find({});
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao buscar usuários", erro: error.message })
    }
});

app.get('/pessoas/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const usuario = await Pessoa.findById(id);

        if (usuario) {
            res.json(usuario)
        } else {
            res.status(404).json({ mensagem: "Usuário não encontrado" })
        }
    } catch (error) {
        res.status(400).json({ mensagem: "Erro de Servidor", erro: error.message })
    }
});

app.get('/pessoas/nome/:nome', async (req, res) => {
    try {
        const buscaNome = req.params.nome;
        const resultados = await Pessoa.find({
            nome: { $regex: buscaNome, $options: '1' }
        });

        if (resultados.length > 0) {
            res.json(resultados);
        } else {
            res.status(404).json({ mensagem: "Usuário Não Encontrado" })
        }
    } catch (error) {
        console.error("Erro na busca", error);
        res.status(500).json({ mensagem: "Erro no servidor", erro: error.message })
    }
});

app.get('/pessoas/idade/:idade', async (req, res) => {
    try {
        const buscaIdade = req.params.idade;
        const resultados = await Pessoa.find({
            idade: buscaIdade
        });

        if (resultados.length > 0) {
            res.json(resultados);
        } else {
            res.status(404).json({ mensagem: "Usuário Não Encontrado" })
        }
    } catch (error) {
        console.error("Erro na busca", error);
        res.status(500).json({ mensagem: "Erro no servidor", erro: error.message })
    }
});

app.delete('/pessoas/:id', protect, async (req, res) => {
    try {
        const id = req.params.id;
        const pessoaDeletada = await Pessoa.findByIdAndDelete(id);

        if (!pessoaDeletada) {
            return res.status(404).json({ mensagem: "Usuário não encontrado" })
        }

        res.json({ mensagem: "Usuário deletado", usuario: usuarioDeletado })
    } catch (error) {
        res.status(400).json({ mensagem: "Erro ao deletar", erro: error.mensagem })
    }
});

app.put("/pessoas/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const nome = req.body.nome;
        const idade = req.body.idade;

        const usuarioAtualizado = await Pessoa.findByIdAndUpdate(
            id,
            { nome, idade },
            { new: true, runValidators: true }
        )
        if (!usuarioAtualizado) {
            return res.status(404).json({ mensagem: "Usuário Não encontrado" })
        }
        res.json(usuarioAtualizado)
    } catch (error) {
        res.status(400).json({ mensagem: "Erro ao atualizar", erro: error.message })
    }
});

app.post('/pessoas', async (req, res) => {
    try {
        const novoUsuario = await Pessoa.create({
            nome: req.body.nome,
            idade: req.body.idade
        });
        res.status(201).json(novoUsuario);
    } catch (error) {
        res.status(400).json({ mensagem: "Dados inváldos ou erro ao salvar", error: error_message })
    }
})

//Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor na porta ${PORT}`)
})