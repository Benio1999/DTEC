/*
and = &&
or = ||
not = !
*/

// && RETORNA TRUE SE TODAS FOREM TRUE
/*const temDinheiro = true;
const estaSol = false;
const tenhoTempo = true;
const sair = temDinheiro && estaSol && tenhoTempo;
console.log(sair)*/

//  || RETORNA TRUE SE PELO MENOS UMA CONDIÇÃO FOR TRUE
/*const temDinheiro = true;
const estaSol = false;
const sair = temDinheiro || estaSol;
console.log(sair)*/

// ! INVERTE O BOOLEANO
/*const estaChovendo = false;
console.log(!estaChovendo);*/

// DUPLA NEGAÇÃO - CONVERSÃO DE DADOS PARA BOOLEANOS
console.log(!!"texto")// STRING NÃO VAZIA = TRUES
console.log(!!"")// STRING VAZIA = FALSE
console.log(!!0)// ZERO RETORNA FALSE
console.log(!!2201)// QUALQUE NÚMERO != DE 0 = TRUE
console.log(!!undefined)// FALSE

// PRIORIDADE DE OPERADORES
const reZero = true || false && false;
console.log(reZero); // true

const re1 = (true || false) && false;
console.log(re1); // false

const a = true;
const b = false;

const re0 = !a && a || b && (!a || !b) && b
console.log(re0)

// ex preatico
const user = "benio";
const senha = "10";

const userD = "benio";
const senhaD = "10"

const logado = userD === user && senhaD === senha;
console.log(logado)

// OP TERNÁRIO
const pontosU = 999

if (pontosU < 1000){
    console.log("USER NORMAL")
} else{
    console.log("USER VIP")
}

const nivel = pontosU < 1000 ? "USER NORMAL":"USER VIP"
console.log(nivel)

// AVALIAÇÃO DE CURTO CIRCUITO
//ooperaador logico || pode ser usado para definir valores padrão quando uma variavel é nula, indefinida ou falsy
const corUser = null;// falsy
const corPadrão = corUser || "verde";
console.log(corPadrão) //trufhy