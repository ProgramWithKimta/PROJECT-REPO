const form = document.querySelector('form');
const formTitle = document.querySelector('#title');
const formIngredients = document.querySelector('#ingredients');
const formInstructions = document.querySelector('#instructions');
const formError = document.querySelector('#error');
const formSubmit = document.querySelector('#submit');
const formModal = document.querySelector('#formModal');
const formModalYes = document.querySelector('#formModalYes');
const formModalNo = document.querySelector('#formModalNo');
const formModalX = document.querySelector('#formModalX');

function readLocalStorage() {
    recipes = JSON.parse(localStorage.getItem('recipes'));
    if(recipes) { return recipes; }
    else { return []; }
};
  
function storeLocalStorage(recipe) {
    const recipes = readLocalStorage();
    recipes.push(recipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));
};

function submitForm(event) {
    event.preventDefault();
    formError.textContent = "";
    if(formTitle.value == '' || formIngredients.value == '' || formInstructions.value == '') {
        error.textContent = 'Please complete the form.';
        return;
    }

    formModal.showModal();
};

function submitConfirmed() {
    const recipe = {
        title: formTitle.value,
        ingredients: formIngredients.value,
        instructions: formInstructions.value,
    }

    storeLocalStorage(recipe);

    formTitle.value = '';
    formIngredients.value = '';
    formInstructions.value = '';

    formModal.close();
};

function clickOutsideModalClose(e) {
    const dialogDimensions = formModal.getBoundingClientRect();
    if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
    ) {
        formModal.close();
    }
}

form.addEventListener('submit', submitForm);

formModalYes.addEventListener('click', submitConfirmed);

formModalX.addEventListener('click', () => {
    formModal.close();
});

formModalNo.addEventListener('click', () => {
    formModal.close();
});

formModal.addEventListener('click', clickOutsideModalClose);

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
