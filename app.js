// Selección de elementos del DOM
const personForm = document.querySelector('#personForm');
const nameInput = document.querySelector('#nameInput');
const ageInput = document.querySelector('#ageInput');
const addPersonButton = document.querySelector('#addPersonButton');
const peopleList = document.querySelector('#peopleList');
const dialogConfirm = document.querySelector('#customDialogConfirm');
const closeButton = dialogConfirm.querySelector('#close-button-confirm');
const buttonAccept = dialogConfirm.querySelector('#accept');
const buttonCancel = dialogConfirm.querySelector('#cancel');
const draggable = document.querySelector('.draggable');

// Variables globales
let isEditing = false;
let editIndex = null;
let deleteIndex = null;
const people = [];

// Event listeners principales
personForm.addEventListener('submit', handleFormSubmit);
closeButton.addEventListener('click', closeConfirmDialog);
buttonAccept.addEventListener('click', handleAcceptDelete);
buttonCancel.addEventListener('click', closeConfirmDialog);

// Función para manejar el submit del formulario
function handleFormSubmit(event) {
    event.preventDefault();

    if (isEditing) {
        updatePerson();
        isEditing = false;
        resetForm();
        setSubmitButtonText("Agregar persona");
        return;
    }

    const name = nameInput.value.trim();
    const age = parseInt(ageInput.value.trim());

    try {
        if (!name || isNaN(age) || age < 0) {
            throw new Error('Ingrese un nombre y una edad válida');
        }
        people.push({ name, age });
        resetForm();
        displayPeople();
        showToast('Persona agregada correctamente');
    } catch (error) {
        console.error(error);
        showDialogError(error.message);
    }
}

// Mostrar personas en la lista
function displayPeople() {
    peopleList.textContent = '';
    people.forEach((person, index) => {
        const divName = document.createElement('div');
        divName.textContent = person.name;

        const divAge = document.createElement('div');
        divAge.textContent = person.age;

        const editIcon = document.createElement('i');
        editIcon.classList.add('fas', 'fa-edit', 'edit-icon');
        editIcon.dataset.index = index;
        editIcon.addEventListener('click', handleEditPerson);

        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fas', 'fa-trash-alt', 'delete-icon');
        deleteIcon.addEventListener('click', () => showDialogDeletePerson(index));

        peopleList.append(divName, divAge, editIcon, deleteIcon);
    });
}

// Mostrar diálogo de error
function showDialogError(message) {
    const dialogError = document.querySelector('#customDialogError');
    dialogError.style.display = 'flex';
    dialogError.showModal();

    const dialogMessage = dialogError.querySelector('#dialogMessage p');
    dialogMessage.textContent = message;
}

const dialogError = document.querySelector('#customDialogError');
const closeErrorButton = dialogError.querySelector('#close-button');
closeErrorButton.addEventListener('click', () => {
    dialogError.close();
    dialogError.style.removeProperty('display');
});

// Diálogo de confirmación de borrado
function showDialogDeletePerson(index) {
    dialogConfirm.style.display = 'flex';
    dialogConfirm.showModal();
    deleteIndex = index;
}

function handleAcceptDelete() {
    if (deleteIndex !== null) {
        deletePerson(deleteIndex);
        deleteIndex = null;
    }
}

function closeConfirmDialog() {
    dialogConfirm.close();
    dialogConfirm.style.removeProperty('display');
    deleteIndex = null;
}

// Borrar persona
function deletePerson(index) {
    people.splice(index, 1);
    displayPeople();
    closeConfirmDialog();
}

// Editar persona
function handleEditPerson(event) {
    isEditing = true;
    editIndex = event.target.dataset.index;
    const person = people[editIndex];
    nameInput.value = person.name;
    ageInput.value = person.age;
    setSubmitButtonText("Guardar cambios");
}

// Actualizar persona
function updatePerson() {
    const name = nameInput.value.trim();
    const age = parseInt(ageInput.value.trim());
    if (!name || isNaN(age) || age < 0) {
        showDialogError('Ingrese un nombre y una edad válida');
        return;
    }
    people[editIndex] = { name, age };
    displayPeople();
    resetForm();
    setSubmitButtonText("Agregar persona");
}

// Utilidades
function resetForm() {
    personForm.reset();
    editIndex = null;
}

function setSubmitButtonText(text) {
    addPersonButton.innerText = text;
}

// Toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
