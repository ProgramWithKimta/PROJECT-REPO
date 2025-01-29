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
    if (recipes) { return recipes; }
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
    if (formTitle.value == '' || formIngredients.value == '' || formInstructions.value == '') {
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

    const h5 = document.createElement('h5');
    h5.classList.add("recipeName");
    h5.textContent = recipe.title;
    h5.style.whiteSpace = "pre";

    const pIngredients = document.createElement('p');
    pIngredients.classList.add("ingredients");
    pIngredients.textContent = recipe.ingredients;
    pIngredients.style.whiteSpace = "pre";

    const pCookingInstructions = document.createElement('p');
    pCookingInstructions.classList.add("cooking-instructions");
    pCookingInstructions.textContent = recipe.instructions;
    pCookingInstructions.style.whiteSpace = "pre";

    const divaddrecipe = document.createElement('div');
    divaddrecipe.classList.add("recipeAdd");
    divaddrecipe.appendChild(h5);
    divaddrecipe.appendChild(pIngredients);
    divaddrecipe.appendChild(pCookingInstructions);
    // divaddrecipe.appendChild(deletebtn);

    const allRecipes = document.querySelector('.allRecipes');
    allRecipes.appendChild(divaddrecipe);

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
const closeXModal = document.querySelector('.xBtn');
const noDeleteModal = document.querySelector('#deleteModalNo');
const yesDeleteModal = document.querySelector('#deleteModalYes');

deleteModalBtn.addEventListener('click', (event) => {
    event.preventDefault();
    modalDelete.showModal();
});

closeXModal.addEventListener('click', () => {
    modalDelete.close();
});

noDeleteModal.addEventListener('click', () => {
    modalDelete.close();
});

yesDeleteModal.addEventListener('click', () => {
    modalDelete.close();
    const divs = document.querySelectorAll('div.recipeAdd');
    for (let i = 0; i < divs.length; i++) {
        divs[i].remove();
    }

    localStorage.clear();
});

// // to append the data from local storage to DOM
// function addRecipeToDom() {
//     const storedRecipe = localStorage.getItem('submittedRecipe');

//     if (storedRecipe) {
//         JSON.parse(storedRecipe);
//         const addRecipe = document.querySelector('.recipeAdd');

//         h5 = document.createElement('h5');
//         h5.textContent = recipe.title;

//         p = document.createElement('p');
//         p.textContent = recipe.ingredients;

//         p = document.createElement('p');
//         p.textContent = recipe.instructions;

//         div = document.createElement('div');
//         div.appendChild(h5);
//         div.appendChild(p);
//         div.appendChild(p);
//         addRecipe.appendChild(div);
//     };
// };

window.onload = function () {
    const storedrecipes = readLocalStorage();
    const allRecipes = document.querySelector('.allRecipes');

    for (recipe in storedrecipes) {
        const h5 = document.createElement('h5');
        h5.classList.add("recipeName");
        h5.textContent = storedrecipes[recipe].title;
        h5.style.whiteSpace = "pre";

        const pIngredients = document.createElement('p');
        pIngredients.classList.add("ingredients");
        pIngredients.textContent = storedrecipes[recipe].ingredients;
        pIngredients.style.whiteSpace = "pre";

        const pCookingInstructions = document.createElement('p');
        pCookingInstructions.classList.add("cooking-instructions");
        pCookingInstructions.textContent = storedrecipes[recipe].instructions;
        pCookingInstructions.style.whiteSpace = "pre";

        const divaddrecipe = document.createElement('div');
        divaddrecipe.classList.add("recipeAdd");
        divaddrecipe.appendChild(h5);
        divaddrecipe.appendChild(pIngredients);
        divaddrecipe.appendChild(pCookingInstructions);

        allRecipes.appendChild(divaddrecipe);
    }
};