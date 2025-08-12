function saudacao(){
    console.log("Bom dia")
}

saudacao();

function soma(a,b){
    return a + b
}

const az = 5;
const bz = 3;
const calculadoraDeMais = soma(az,bz);
console.log(calculadoraDeMais)

//função com parâmetros padrão
function somapadrao(x = 1, y = 1){
    return x + y
}

console.log(somapadrao(-1))

//----------> FUNÇÕES ANONIMAS <------------\\
const raiz = function(n){
    return n ** 0.5
}
console.log(raiz(4))

//---->ARROW FUNCTION<----\\
const sqrt = (n) => n ** 0.5;

console.log(sqrt(100))