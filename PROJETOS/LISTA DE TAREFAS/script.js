function adicionarTarefa() {
    const input = document.getElementById("novaTarefa");
    const texto = input.value.trim();
    if (texto === "") return;

    const li = document.createElement("li");
    const p = document.createElement("p");
    p.textContent = texto;
    p.className = "tarefa";
    li.appendChild(p);

    const btnR = document.createElement('button');
    btnR.textContent = "Remover";
    btnR.className = "remove";
    btnR.onclick = function() {
        li.remove();
    };

    li.onclick = function() {
        li.classList.toggle('feito');
    };

    li.appendChild(btnR);
    document.getElementById("lista").appendChild(li)

    input.value = "";

}