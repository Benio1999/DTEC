const aleatorio = (x,y) => Math.random() * (x - y) + x
function escolha(n){
    if (n === 1) {
        return "EU VOU DIRIGIR DEPOIS DE BEBER, O VEADINHO ALI SÓ SABE CORRER, SE MULTAR Ñ VOU ME IMPORTAR, VOU ATROPELAR!!!!!"
    }
    if(n === 2){
        return "vida de caipira não é fácil"
    }
    else{
        return "eu sinto o shadow no meu cu"
    }
}








const a2 = aleatorio(1,3)

// console.log(a2)

// console.log(escolha(Math.round(aleatorio(1,3))))

console.log(escolha(Math.round(a2)))