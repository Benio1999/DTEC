const idade = Number(prompt("Digite Sua Idade:"));
const result = document.getElementById('resultado');

if(idade>=0 && idade<=12){
    result.innerHTML += `<p>criança</p>`
}
else if(idade>=13 && idade<=17){
    result.innerHTML += `<p>adolescente</p>`
}
else if(idade>=18 && idade<=59){
    result.innerHTML += `<p>adulto</p>`
}
else if(idade>=60){
    result.innerHTML += `<p>idoso</p>`
}
else{
    result.innerHTML += '<p>IDADE NÃO DEFINIDA</p>'
}