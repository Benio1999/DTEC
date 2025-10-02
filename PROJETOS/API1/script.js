

//Endereço do servidor node rodando na máquina
const API_URL = 'http://localhost:3002/usuarios';

//ELEMENTOS CONTAINER
const userCardsContainer = document.getElementById('user-cards-container');
const addUserForm = document.getElementById('addUserForm');
const btnListUsers = document.getElementById('btnListUsers');

//ELEMENTOS DO MODAL
const editModal = document.getElementById('editModal');
const editUserForm = document.getElementById('editUserForm');
const btnCancelEdit = document.getElementById('btnCancelEdit');
const editIdInput = document.getElementById('editID');
const editNameInput = document.getElementById('editName');
const editAgeInput = document.getElementById('editAge');
//FUNÇÕES
//FUNÇÃO DE REQUISIÇÃO DE USUÁRIOS NA API
function fetchAndRenderUsers() {
    fetch(API_URL)
        .then(response => response.json())
        .then(users => renderUser(users))
        .catch(error => {
            console.error('Erro ao buscar usuários', error);
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
            fetchAndRenderUsers();
        })
        .catch(error => console.error('Erro ao adicionar usuário', error))
};

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
        .catch(error => console.error("Erro ao editar usuário", error))
};

function deleteUser(userId) {
    fetch(`${API_URL}/${userId}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(() => {
            fetchAndRenderUsers();
        })
        .catch(error => console.error("Erro ao excluir usuário", error))
}

//FUNÇÃO DE CRIAÇÃO DE CARDS NA TELA
function renderUser(users) {
    userCardsContainer.innerHTML = ``;

    if (users.length === 0) {
        userCardsContainer.innerHTML = `<p>Nenhum usuário cadastrado</p>`;
        return;
    }

    users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.className = 'user-card';

        userCard.innerHTML = `
        <div class="user-info">
            <p><strong>ID:</strong>${user.id}</p>
            <p><strong>Nome:</strong>${user.nome}</p>
            <p><strong>Idade:</strong>${user.idade}</p>
        </div>
        <div class="card-buttons">
            <button class="btn-edit">Editar</button>
            <button class="btn-delete">Excluir</button>
        </div>
        `;
        const editBtn = userCard.querySelector('.btn-edit')
        const deleteBtn = userCard.querySelector('.btn-delete')

        editBtn.addEventListener('click', () => {
            editIdInput.value = user.id;
            editNameInput.value = user.nome;
            editAgeInput.value = user.idade;
            editModal.style.display = 'flex'
        })
        deleteBtn.addEventListener('click', () => {
            if (confirm(`Tem certeza que deseja excluir o usuário ${user.id}`)) {
                deleteUser(user.id);
            }
        })

        userCardsContainer.appendChild(userCard)
    })
}

btnListUsers.addEventListener('click', fetchAndRenderUsers);

addUserForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newUserName = document.getElementById('addName').value;
    const newUserAge = parseInt(document.getElementById('addAge').value);

    addUser({ nome: newUserName, idade: newUserAge })
});

editUserForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const userId = editIdInput.value;
    const newName = editNameInput.value;
    const newAge = parseInt(editAgeInput.value);

    editUser(userId, { nome: newName, idade: newAge });
})

btnCancelEdit.addEventListener('click', ( )=> {
    editModal.style.display = 'none';
})

window.addEventListener('click', (e) => {
    if(e.target === editModal) {
        editModal.style.display = 'none';
    }
});

//Carregar usuários
fetchAndRenderUsers();