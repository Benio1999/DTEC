const temp = Number(prompt('DIGITE A TEMPERATURA'))
const result = document.getElementById('resultado');

if(temp<0){
    result.innerHTML += 'congelando'
}
else if(temp>=0 && temp<=20){
    result.innerHTML += 'Frio'
}
else if(temp>20 && temp<=30){
    result.innerHTML += 'Agradável'
}
else if(temp>30){
    result.innerHTML += 'QUENTE'
}
else{
    result.innerHTML += 'TEMPERATURA NÃO DEFINIDA'
}