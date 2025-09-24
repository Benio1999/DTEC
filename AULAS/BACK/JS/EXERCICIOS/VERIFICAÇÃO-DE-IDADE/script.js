const idade = Number(prompt("Digite Sua Idade:"));
const result = document.getElementById('resultado');

if(idade<18){
    result.innerHTML += `<p>MENOR DE IDADE</p>`
}
else if(idade>=18 && idade<=59){
    result.innerHTML += `<p>ADULTO</p>`
}
else if(idade>60){
    result.innerHTML += `<p>IDOSO</p>`
}
else{
    result.innerHTML += '<p>IDADE NÃO DEFINIDA</p>'
}