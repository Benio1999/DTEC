fetch('https://pokeapi.co/api/v2/pokemon/25')
.then(response => {
    return response.json()
})
.then(data => {
    console.log(data)
    console.log(data.name)
    const pokeName = data.name
    const pokePeso = data.weight
    const pokeAlt = data.height
    const nome = document.querySelector('.nome')
    const peso = document.querySelector('.peso')
    const altura = document.querySelector('.altura')
    nome.innerHTML +=`${pokeName}`
    altura.innerHTML +=`${pokeAlt}`
    peso.innerHTML +=`${pokePeso}`
})