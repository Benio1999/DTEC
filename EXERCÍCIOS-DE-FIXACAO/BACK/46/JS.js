const form = document.querySelector('.formulario');
const resultado = document.querySelector('.resultado');

const pessoas = [];

form.addEventListener('click',function(evento) {
    evento.preventDefault();

    const nome = form.querySelector('.nome').value;

    const ser = {
        nome,
    };

    pessoas.push(ser);

    resultado.innerHTML = `<p>Olá ${nome}</p>`;
})