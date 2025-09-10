const form = document.querySelector('.formulario'); 
const resultado = document.querySelector('.resultado');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const peso = form.querySelector('.peso').value;
    const altura = form.querySelector('.altura').value;
    const imc = Number(peso)/Number(altura)**2;


    if(altura === "" || altura === undefined || altura === 0){
        resultado.innerHTML = `<p class='bad'>Altura invalida</p>` 
    }
    else if(peso === "" || peso === undefined || peso === 0){
        resultado.innerHTML = `<p class='bad'>Peso invalido</p>` 
    }
    else{
        if(imc<18.5){
            resultado.innerHTML = `<p class='paragrafo-resultado'>Seu IMC é ${imc.toFixed(2)} (Abaixo do peso) </p>`
        }
        else if(imc>=18.5 && imc<=24.9){
            resultado.innerHTML = `<p class='paragrafo-resultado'>Seu IMC é ${imc.toFixed(2)} (Peso normal) </p>`
        }
        else if(imc>=25 && imc<=29.9){
            resultado.innerHTML = `<p class='paragrafo-resultado'>Seu IMC é ${imc.toFixed(2)} (Sobrepeso) </p>`
        }
        else if(imc>=30 && imc<=34.9){
            resultado.innerHTML = `<p class='paragrafo-resultado'>Seu IMC é ${imc.toFixed(2)} (Obesidade grau 1) </p>`
        }
        else if(imc>=35 && imc<=39.9){
            resultado.innerHTML = `<p class='paragrafo-resultado'>Seu IMC é ${imc.toFixed(2)} (Obesidade grau 2) </p>`
        }
        else if(imc>=40){
            resultado.innerHTML = `<p class='paragrafo-resultado'>Seu IMC é ${imc.toFixed(2)} (Obesidade grau 3) </p>`
        }
        else{
            resultado.innerHTML = `<p class='bad'>Peso ou altura invalidos</p>`
        }
        form.reset()
}})