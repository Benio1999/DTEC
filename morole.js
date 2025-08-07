const aleatorio = (x,y) => Math.random() * (x - y) + x
function escolha(n){
    if (n == 1) {
        return "ala, 1"
    }
    if(n == 2){
        return "2 bestas programando"
    }
    else{
        return "3"
    }
}

// const a2 = aleatorio(1,3)

// console.log(a2)

console.log(escolha(Math.round(aleatorio(1,3))))