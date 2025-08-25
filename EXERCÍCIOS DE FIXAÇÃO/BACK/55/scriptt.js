const mudar = document.getElementById("dark")

mudar.addEventListener("click", () => {
    const douglas = document.body.classList.toggle("black");

    button.textContent = douglas ? "Modo Escuro" : "Modo Claro";
})