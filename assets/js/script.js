const form = document.querySelector('form');
const formTitle = document.querySelector('#title');
const formIngredients = document.querySelector('#ingredients');
const formInstructions = document.querySelector('#instructions');
const formError = document.querySelector('#error');
const formSubmit = document.querySelector('#submit');
const formModal = document.querySelector('#formModal');
const formModalYes = document.querySelector('#formModalYes');
const formModalNo = document.querySelector('#formModalNo');

function readLocalStorage() {
    recipes = JSON.parse(localStorage.getItem('recipes'));
    if(recipes) { return recipes; }
    else { return []; }
}
  
function storeLocalStorage(recipe) {
    const recipes = readLocalStorage();
    recipes.push(recipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

function submitForm(event) {
    event.preventDefault();
    formError.textContent = "";
    if(formTitle.value == '' || formIngredients.value == '' || formInstructions.value == '') {
        error.textContent = 'Please complete the form.';
        return;
    }

    formModal.showModal();
}

function submitConfirmed() {
    const recipe = {
        title: formTitle.value,
        ingredients: formIngredients.value,
        instructions: formInstructions.value,
    }

    storeLocalStorage(recipe);
    formModal.close();
}

form.addEventListener('submit', submitForm)

form.addEventListener('submit', (event) => {
    event.preventDefault();
    formError.textContent = "";
    if(formTitle.value == '' || formIngredients.value == '' || formInstructions.value == '') {
        error.textContent = 'Please complete the form.';
        return;
    }

    formModal.showModal();
});

formModalYes.addEventListener('click', submitConfirmed);

formModalNo.addEventListener('click', () => {
    formModal.close();
});

// Modal to appear when delete button is selected
const deleteModalBtn = document.querySelector('.deleteBtn');
const modalDelete = document.querySelector('.deleteModal');
const closeXModal = document.querySelector('.xBtn')

deleteModalBtn.addEventListener('click', (event) => {
    event.preventDefault();
    modalDelete.showModal();
});

closeXModal.addEventListener('click', () => {
    modalDelete.close();
});
