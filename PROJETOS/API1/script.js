//URL do servidor

const { response } = require("express");

//Endereço do servidor node rodando na máquina
const API_URL = 'http://localhost:3001/usuarios';

//ELEMENTOS CONTAINER
const userCardsContainer = document.getElementById('user-cards-container');
const addUserForm = document.getElementById('addUserForm');
const btnListUsers = document.getElementById('btnListUsers');

//ELEMENTOS DO MODAL
const editModal = document.getElementById('editModal');
const editUserForm = document.getElementById('editUserForm');
const cancelEdit = document.getElementById('btnCancelEdit');
const editIdInput = document.getElementById('editID');
const editNameInput = document.getElementById('editName');
const editAgeInput = document.getElementsByTagName('editAge');

//FUNÇÕES
//FUNÇÃO DE REQUISIÇÃO DE USUÁRIOS NA API
function fetchAndRenderUsers() {
    fetch(API_URL)
        .then(response => response.json())
        .then(users => RenderUsers(users))
        .catch(error => {
            console.error('Erro ao buscar usuátios', error);
            userCardsContainer.innerHTML = `<p>Erro ao carregar usuários</p>`
        })
}

//FUNÇÃO PARA ADD USUÁRIOS
function addUser(userData) {
    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(() => {
        addUserForm.reset();
        fetchAndRenderUsers()
    })    
}