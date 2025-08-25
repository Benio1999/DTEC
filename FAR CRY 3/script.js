const button = document.getElementById("toggle-theme");

button.addEventListener("click", () => {
  const isDarkMode = document.body.classList.toggle("dark-mode");

  button.textContent = isDarkMode ? "Modo Claro" : "Modo Escuro";
});
