//importanto express
const express = require('express');

//criando minha aplicação
const app = express();

//permitir trabalhar com json
app.use(express.json());

//porta onde a API vai rodar
const PORT = 3001;

let usuarios = [
    {id: 1, nome: "Ana", idade: 25},
    {id: 2, nome: "Carlos", idade: 60},
    {id: 3, nome: "Mario", idade: 500},
    {id: 4, nome: "Mario Luigi", idade: 5}
]
 
app.get('/',(req,res) => {
    res.send("PÁGINA INICIAL")
})

app.get('/usuarios',(req,res) => {
    res.json(usuarios);
})

app.get('/usuarios/:id',(req,res) => {
    const id = req.params.id
    const usuario = usuarios.find(u => u.id == id)
    if(usuario){
        res.json(usuario)
    }else {
        res.status(404).json({mensagem: "Usuário não encontrado"})
    }
})

app.get('/usuarios/buscar/:nome',(req,res) => {
    const buscarNome = req.params.nome.toLowerCase()
    const resultado = usuarios.filter(u => u.nome.toLowerCase().includes(buscarNome))
    if(resultado.length > 0){
        res.json(resultado)
    }else{
        res.status(404).json({mensagem: "Usuário não encontrado"})
    }
})

//Inicia o servidor
app.listen(PORT, () =>{
    console.log(`Servidor na porta ${PORT}`)
})