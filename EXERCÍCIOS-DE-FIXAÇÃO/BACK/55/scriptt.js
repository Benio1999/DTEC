// const mudar = document.getElementById("dark-toggle")

// mudar.addEventListener("click", () => {
//     const mudou = document.body.classList.toggle("black");

//     button.textContent = mudou ? "Modo Claro" : "Modo Escuro";
// });
function mudancaDeTema(){
    const mudar = document.getElementById("dark-toggle")
    mudar.addEventListener("click", () => {
        const mudou = document.body.classList.toggle("black");
        button.textContent = mudou ? "Modo Claro" : "Modo Escuro";
    })}
