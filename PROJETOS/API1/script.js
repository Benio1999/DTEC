const { response } = require("express");

//Criando uma constante com o endereço da API 
const API_URL = "http://localhost:3001/pessoas";

//Seleção de Elementos do HTML INICIAL
const userCardsContainer = document.getElementById('user-cards-container');
const addUserForm = document.getElementById('addUserForm');
const btnListUsers = document.getElementById('btnListUsers');

//Seleção de elementos do MODAL
const editModal = document.getElementById('editModal');
const editUserForm = document.getElementById('editUserForm');
const btnCancelEdit = document.getElementById('btnCancelEdit');
const editIdInput = document.getElementById('editId');
const editNameInput = document.getElementById('editName');
const editAgeInput = document.getElementById('editAge');

//ELEMENTOS DO MODAL DE LOGIN
const loginModal = document.getElementById('loginModal');
const btnLoginModal = document.getElementById('btnLoginModal');
const btnCancelLogin = document.getElementById('btnCancelLogin');
const adminLoginForm = document.getElementById('adminLoginForm');
const adminAuthStatus = document.getElementById('adminAuthStatus');

//EVENTOS DO MODAL DE REGISTRO 
const registerModal = document.getElementById('registerModal');
const btnRegisterModal = document.getElementById('btnRegisterModal');
const btnCancelRegister = document.getElementById('btnCancelRegister');
const adminRegisterForm = document.getElementById('adminRegisterForm');
const adminRegisterStatus = document.getElementById('adminRegisterStatus');

//VARIÁVEL GLOBAL PARA O TOKEN
let authToken = '';

//CRIAÇÃO DE FUNÇÕES
function fetchAndRenderUsers() {
    //Faz uma requisição GET para a URL
    fetch(API_URL)
        .then(response => response.json())
        //renderUsers() função que vai organizar as informações na tela
        .then(users => renderUsers(users))
        .catch(error => {
            console.error("Erro ao buscar usuários", error);
            userCardsContainer.innerHTML = `<p>Erro ao carregar usuários</p>`
        })
}

//Função para adicionar um novo usuário
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
            fetchAndRenderUsers();
        })
        .catch(error => console.error("Erro ao adicionar usuário", error));
}

//FUNÇÃO PARA CRIAR CONTA - RESGISTRAR ADM
function handleAdminRegister(email, password) {
    adminRegisterStatus.textContent = "Registrando...";
    adminRegisterStatus.style.color = "blue";

    fetch('http://localhost:3001/api/register-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.mensagem && data.mensagem.includes("sucesso")) {
                adminRegisterStatus.style.color = "green";
                adminRegisterStatus.textContent = "Conta criada com sucesso";
                setTimeout(() => {
                    registerModal.style.display = 'none';
                    document.getElementById('regUsername').value = "";
                    document.getElementById('regPassword').value = "";
                })
            } else {
                adminRegisterStatus.style.color = "red";
                adminRegisterStatus.textContent = data.mensagem;
            }
        })
        .catch(() => {
            adminRegisterStatus.style.color = "green";
            adminRegisterStatus.textContent = "Erro de rede ou servidor";
        })
}

//FUNÇÃO PARA LOGIN
function handleAdminRegister(email, password) {
    fetch('http://localhost:3001/api/login-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                authToken = data.token;
                adminAuthStatus.style.color = 'green';
                adminAuthStatus.textContent = 'Login realizado com sucesso! Token obtido';
                loginModal.style.display = 'none'
            } else {
                adminAuthStatus.style.color = 'red';
                adminAuthStatus.textContent = data.mensagem;
            }
        })
        .catch(() => {
            adminAuthStatus.style.color = 'red';
            adminAuthStatus.textContent = 'Erro de rede ou servidor';
        })
}

//FUNÇÃO PARA EDITAR USUÁRIO EXISTENTE
function editUser(userId, userData) {
    fetch(`${API_URL}/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(response => response.json())
        .then(() => {
            editModal.style.display = 'none';
            fetchAndRenderUsers();
        })
        .catch(error => console.error("Erro ao editar o usuário", error));
}

//FUNÇÃO PARA DELETAR USUÁRIO
function deleteUser(userId) {
    if(!authToken) {
        adminAuthStatus.style.color = 'orange';
        adminAuthStatus.textContent = 'ERRO: Faça o login para deletar';
        return;
    }
    fetch(`${API_URL}/${userId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    })
    .then(response => {
        if(response.status === 401) {
            adminAuthStatus.style.color = 'red';
            adminAuthStatus.textContent = 'Não autorizado! Token inválido';
            return response.json().then(err => Promise.reject(err));
        }
        return response.json();
    })
    .then(() => {
        fetchAndRenderUsers()
    })
    .catch(error => console.error('Erro ao excluir usuário:', error.mensagem))
}

function renderUsers(users) {
    userCardsContainer.innerHTML = "";

    if (users.length === 0) {
        userCardsContainer.innerHTML = `<p>Nenhum usuário cadastrado</p>`
        return;
    }

    users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.className = 'user-card';

        userCard.innerHTML = `
            <div class="user-info">
                <p><strong>ID:</strong>${user._id.slice(0, 5)}</p>
                <p><strong>Nome:</strong>${user.nome}</p>
                <p><strong>Idade:</strong>${user.idade}</p>
            </div>
            <div class="card-buttons">
                <button class="btn-edit">Editar</button>
                <button class="btn-delete">Excluir</button>
            </div>
        `;

        const editBtn = userCard.querySelector('.btn-edit');
        const deleteBtn = userCard.querySelector('.btn-delete');

        editBtn.addEventListener('click', () => {
            editIdInput.value = user._id;
            editNameInput.value = user.nome;
            editAgeInput.value = user.idade;
            editModal.style.display = 'flex';
        })

        deleteBtn.addEventListener('click', () => {
            if (confirm(`Tem certeza que deseja excluir o usuário ${user._id.slice(0, 5)}?`)) {
                deleteUser(user._id);
            }
        });
        userCardsContainer.appendChild(userCard);

    })

}

//Função botão Listar  Usuários
btnListUsers.addEventListener('click', fetchAndRenderUsers);

addUserForm.addEventListener('submit', (e) => {
    e.preventDefault();//Impede que o submit recarregue a página

    const newUserName = document.getElementById('addName').value
    const newUserAge = parseInt(document.getElementById('addAge').value);

    addUser({ nome: newUserName, idade: newUserAge })
})

editUserForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const userId = editIdInput.value;
    const newName = editNameInput.value;
    const newAge = editAgeInput.value;

    editUser(userId, { nome: newName, idade: newAge });
})

btnCancelEdit.addEventListener('click', () => {
    editModal.style.display = 'none'
})

window.addEventListener('click', (e) => {
    if (e.target === editModal) {
        editModal.style.display = 'none'
    }
})

fetchAndRenderUsers();