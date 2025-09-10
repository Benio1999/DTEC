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
    {id: 3, nome: "Mario", idade: 500}
]

app.get('/',(req,res) => {
    res.send("PÁGINA INICIAL")
})

app.get('/usuarios',(req,res) => {
    res.json(usuarios);
})

//Inicia o servidor
app.listen(PORT, () =>{
    console.log(`Servidor na porta ${PORT}`)
})