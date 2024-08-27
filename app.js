const personForm = document.querySelector('#personForm');
const nameInput = document.querySelector('#nameInput');
const ageInput = document.querySelector('#ageInput');
const addPersonButton = document.querySelector('#addPersonButton');
const peopleList = document.querySelector('#peopleList');
const dialogConfirm= document.querySelector('#customDialogConfirm');
const closeButton = dialogConfirm.querySelector('#close-button-confirm');
const buttonAccept= dialogConfirm.querySelector('#accept');
const buttonCancel= dialogConfirm.querySelector('#cancel');

/* la variable index no está definida globalmente, está declarada en el ámbito del script principal.
En JavaScript, las variables que no están declaradas dentro de una función se consideran globales  */
let isEditing = false;
let index = 0;
const people = [];

personForm.addEventListener('submit', addPerson);


function addPerson(event) {
   
    event.preventDefault();

    //si estoy editando un objeto del array(persona)
    if (isEditing) {
        actualizarPersona();
        isEditing = false;
        document.querySelector("form").reset();
        document.querySelector("button[type='submit']").innerText = "Agregar persona";
        return;
    }

    const name = nameInput.value.trim();
    const age = parseInt(ageInput.value.trim());

    try {
        // si name es falso (es decir, null, undefined, false, una cadena vacía, etc.) o si age no es un número válido 
        //o es menor que 0
        if (!name || isNaN(age) || age < 0) {
            throw new Error('Ingrese un nombre y una edad válida');
        }

        //creo el objeto person con las variables name y age (el nombre de la variable será el nombre de la propiedad)
        const person = {name, age};
        console.log(person);

        //añado el objero al array people
        people.push(person);

        //limpio los campos del formulario
        document.querySelector("form").reset();

        //llamo a la funcion de pintar las personas
        displayPeople();
    } 
    catch (error) {
        //console.error se muestra acompañados de un icono de error.
        console.error(error);
        showDialogError(error);
    }
}

function displayPeople() {
    //limpio el listado
    peopleList.textContent = '';

    //recorro el array people
    people.forEach((person, index) => {

    const divName = document.createElement('div');
    divName.textContent = person.name;

    const divAge = document.createElement('div');
    divAge.textContent = person.age;

    const editIcon = document.createElement('i');
    editIcon.classList.add('fas', 'fa-edit', 'edit-icon');
    // Establecer el atributo data-index en el índice actual
    editIcon.setAttribute('data-index', index);


    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fas', 'fa-trash-alt', 'delete-icon');

    //añado un listener a lso botones de editar y borrar, pasando el index a la funcion
    deleteIcon.addEventListener('click', () => showDialogDeletePerson(index));
    editIcon.addEventListener('click', (e) => editPerson(e));

    peopleList.appendChild(divName);
    peopleList.appendChild(divAge);
    peopleList.appendChild(editIcon);
    peopleList.appendChild(deleteIcon);

    });
}

function showDialogError(message) {
    const dialogError= document.querySelector('#customDialogError');
    dialogError.style.display = 'flex'; // Cambia el display a flex
    dialogError.showModal();

    const dialogMessage = dialogError.querySelector('#dialogMessage p');
    dialogMessage.textContent = message;

    const closeButton = dialogError.querySelector('#close-button');
    closeButton.addEventListener('click', () => {
        dialogError.close();
        dialogError.style.removeProperty('display'); // Elimina la propiedad display
    });
}


function showDialogDeletePerson(index) {
       
    dialogConfirm.style.display = 'flex'; // Cambia el display a flex
    dialogConfirm.showModal();
    
    closeButton.addEventListener('click', () => {
        dialogConfirm.close();
        dialogConfirm.style.removeProperty('display'); // Elimina la propiedad display
    });

    buttonAccept.addEventListener('click', deletePerson(index));

    buttonCancel.addEventListener('click', () => {
      dialogConfirm.close();
      dialogConfirm.style.removeProperty('display'); // Elimina la propiedad display
    });      
  }

function deletePerson(index){
  console.log('El índice del elemento cuando se borra es: ', index);
  console.log('El array antes de borrar es: ', people);
  dialogConfirm.close();
  dialogConfirm.style.removeProperty('display');
  people.splice(index, 1); // Eliminar la persona
  displayPeople(); // Actualizar la lista
}


function editPerson(event) {
    //pongo a true el booleano para saber que estoy editando
    isEditing = true;

    //asignamos el valor a la variable global index.
    //para acceder al valor del atributo data-index tenemos 2 maneras
    //1-event.target.getAttribute('data-index'):  accede al valor del atributo data-index del elemento que desencadenó el evento.
    //2-event.target.dataset.index : event.target es el mismo elemento de origen del evento y
    //dataset es una propiedad de los elementos DOM que proporciona acceso a todos los atributos de datos (data-*).
    index = event.target.dataset.index;

    //guardo en person el objeto del array que queremos editar
    const person = people[index];

    //Dejo los valores en las input
    nameInput.value = person.name;
    ageInput.value = person.age;

   //Cambio el texto del botón
    document.querySelector("button[type='submit']").innerText = "Guardar cambios";  
}


function actualizarPersona() {

    // Actualizar la persona en el arreglo
    const name = document.querySelector('#nameInput').value;
    const age = document.querySelector('#ageInput').value;
    const person = {name, age};
    people[index] = person;

    // Actualizar la tabla y resetear el formulario
    displayPeople();
    document.querySelector("form").reset();
}


const draggable = document.querySelector('.draggable');
let offsetX, offsetY;

draggable.addEventListener('mouseenter', () => {
  draggable.classList.add('drag');
});

draggable.addEventListener('mouseleave', () => {
  if (!draggable.classList.contains('dragging')) {
    draggable.classList.remove('drag');
  }
});

draggable.addEventListener('mousedown', (e) => {
  offsetX = e.clientX - draggable.getBoundingClientRect().left;
  offsetY = e.clientY - draggable.getBoundingClientRect().top;
  draggable.style.cursor = 'grabbing';
  draggable.classList.add('dragging');

  document.addEventListener('mousemove', move);
  document.addEventListener('mouseup', stopMove);
});

function move(e) {
  draggable.style.left = `${e.clientX - offsetX}px`;
  draggable.style.top = `${e.clientY - offsetY}px`;
}

function stopMove() {
  document.removeEventListener('mousemove', move);
  document.removeEventListener('mouseup', stopMove);
  draggable.style.cursor = 'grab';
  draggable.classList.remove('dragging');
  draggable.classList.add('drag');
}