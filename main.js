'use strict';
const template = `<div class="header">
    <h1 class="header__text">To do list</h1>
</div>
    <form class="input_form">
    <label for="input_form__input">Input todo</label>
        <input type="text "name="input_form__input" id="input_form__input" class="input_form__input"  required>
        <button type="submit" class="btn input_form__button">submit</button>
    </form>
    <p class="user_prompt"></p>
    <ul class="list">
    </ul>
`;
document.body.innerHTML = template;

const submitButton = document.querySelector('.input_form__button');
const userInput = document.querySelector('.input_form__input');
const userPrompt = document.querySelector('.user_prompt');
const list = document.querySelector('.list');
const inputForm = document.querySelector('.input_form');
const listCards = document.querySelectorAll('.list__card');
const items = JSON.parse(localStorage.getItem('listItem'));

let chores = [];

if (items === null || Object.entries(items).length === 0) {
  userPrompt.innerHTML = 'Add your first chore!';
} else {
  localStorage.setItem('listItem', JSON.stringify(items));
  chores = JSON.parse(localStorage.getItem('listItem'));
  items.forEach(item => {
    list.innerHTML += `<div class="list__card">
    <li class="card__item">${item}</li>
    <button class="btn btn-delete">Delete</button>
    </div>`;
  });

  // Add functionality to the generated delete buttons (functions.js)
  deleteButtonHandler();
}

inputForm.addEventListener('submit', function(event) {
  if (userInput.value.trim() === '') {
    window.alert('Gotta write something my man');
  } else {
    event.preventDefault();
    chores.push(userInput.value);
    userInput.value = '';
    userPrompt.innerHTML = '';
    localStorage.setItem('listItem', JSON.stringify(chores));
    const items = JSON.parse(localStorage.getItem('listItem'));

    list.innerHTML += `<div class="list__card">
    <li class="card__item">${items.pop()}</li>
    <button class="btn btn-delete">Delete</button>
    </div>`;

    // Add functionality to the generated delete buttons (functions.js)
    deleteButtonHandler();
  }
});
