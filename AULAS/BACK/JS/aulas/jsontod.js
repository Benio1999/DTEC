const listaDeCompras = {
    "nome": "lista de compras",
    "data": "21/08/2025",
    "itens": [
        {  
            "item": "maçã",
            "quantidade": 5
        },
        {
            "item": "pão",
            "quantidade": 2
        }
    ]
};
/*criar um objeto de perfil de usuário com nome, idade,
email e hobbies, sendo um hobbie para cada dia da semana*/
const perfilDeUsuario = {
    "nome": "kleiton",
    "idade": "29",
    "email": "kleiton@gmail.com",
    "hobbies": [
        {
            "hobbie": "chorar",
            "dia": "domingo"
        },
        {
            "hobbie": "assistir godzilla",
            "dia": "segunda"
        },
        {
            "hobbie": "ler homem aranha e se decepcionar com a Marvel",
            "dia": "terça"
        },
        {
            "hobbie": "fazer piada com a Nintendo e tentar evitar um processo",
            "dia": "quarta"
        },
        {
            "hobbie": "jogar de bola",
            "dia": "quinta"
        },
        {
            "hobbie": "comer pizza",
            "dia": "sexta"
        },
        {
            "hobbie": "pescar",
            "dia": "sábado"
        },
    ]
}
console.log(perfilDeUsuario.hobbies[1].dia)
/*pratica com catalogo de 3 livros
titulo, autor, ano de publicação, disponivel(booleano*/
const catalogo = {
    "livros": [
        {
            "titulo": "MEU BERGENTRUCK",
            "autor": "Asgore",
            "publicado": "08/08/2025",
            "disponivel": true,
        },
        {
            "titulo": "I'M THE STORM",
            "autor": "Vergil",
            "publicado": "08/03/2019",
            "disponivel": false,
        },
        {
            "titulo": "Deitei minha sogra na porrada após descubrir que ela era um demonio, agora sou um exorcista no Alabam",
            "autor": "Victor",
            "publicado": "08/05/2020",
            "disponivel": true,
        },
    ]
}