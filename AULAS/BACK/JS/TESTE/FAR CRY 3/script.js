const button = document.getElementById("togle-theme");

button.addEventListener("click", () => {
  const isDarkMode = document.body.classList.toggle("dark-mode");

  button.textContent = isDarkMode ? "Modo Claro" : "Modo Escuro";
});
