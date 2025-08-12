/*const pessoa1 = {
    nome: "Junin",
    sobrenome: "kleber",
    idade: 69
}
console.log(pessoa1.nome)
console.log(pessoa1.idade)
console.log(pessoa1.sobrenome)*/

//FUNÇÃO FÁBRICA
function criarPessoa(nome,sobrenome,idade) {
    return{
        nome,
        sobrenome,
        idade
    }
}

const p2 = criarPessoa("Jonas", "Antolieta", 97778000006)
console.log(p2.nome)
console.log(p2.idade)
console.log(p2.sobrenome)

//criar metodo
function criarCachorro(nome, sono, fome) {
    return{
        nome,
        sono,
        fome,

        latido(){
            console.log("fala humano, CADE MINHA RAÇÃO?")
        },
        dormir(){
            if (this.sono){
                this.sono = false
            }
        }
    }
}

const c1 = criarCachorro("bob",true,100)
c1.latido()