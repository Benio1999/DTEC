const idade = Number(prompt("Digite Sua Nota:"));
const result = document.getElementById('resultado');

if(idade<6){
    result.innerHTML += `<p>REPROVADO</p>`
}
else if(idade>=6 && idade<=7.9){
    result.innerHTML += `<p>RECUPERAÇÃO</p>`
}
else if(idade>=8){
    result.innerHTML += `<p>APROVADO</p>`
}
else{
    result.innerHTML += '<p>NOTA NÃO DEFINIDA</p>'
}