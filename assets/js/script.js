const form = document.querySelector('form');
const formTitle = document.querySelector('#title');
const formIngredients = document.querySelector('#ingredients');
const formInstructions = document.querySelector('#instructions');
const formError = document.querySelector('#error');
const formSubmit = document.querySelector('#submit');

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
    // event.preventDefault();
    formError.textContent = "";
    if(formTitle.value == '' || formIngredients.value == '' || formInstructions.value == '') {
        error.textContent = 'Please complete the form.';
        return;
    }

    const recipe = {
        title: formTitle.value,
        ingredients: formIngredients.value,
        instructions: formInstructions.value,
    }

    storeLocalStorage(recipe);
}

form.addEventListener('submit', submitForm)