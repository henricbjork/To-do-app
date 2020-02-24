'use strict';
const template = `
<main>
<div class="header">
    <h1 class="header__text">To do list</h1>
</div>
    <form class="input_form">
    <label for="input_form__input">Input todo</label>
        <input type="text "name="input_form__input" id="input_form__input" class="input input_form__input"  required>
        <button type="submit" class="btn input_form__button">Submit</button>
    </form>
    <p class="user_prompt"></p>
    <ul class="list">
    </ul>
    </main>
    <section class="completed">
    <h1>completed</h1>
    <p class="finished_prompt"></p>
    <ul class="finished_list">
    </ul>
    </section>
`;
document.body.innerHTML = template;

const submitButton = document.querySelector('.input_form__button');
const userInput = document.querySelector('.input_form__input');
const userPrompt = document.querySelector('.user_prompt');
const list = document.querySelector('.list');
const inputForm = document.querySelector('.input_form');
const listCards = document.querySelectorAll('.list__card');
const finishedList = document.querySelector('.finished_list');
const items = JSON.parse(localStorage.getItem('listItem'));
const finishedItems = JSON.parse(localStorage.getItem('finishedItem'));
const finishedPrompt = document.querySelector('.finished_prompt');

let chores = [];
let comparer = [];
let finished = [];

if (items === null || Object.entries(items).length === 0) {
  userPrompt.innerHTML = 'Add your first chore!';
} else {
  localStorage.setItem('listItem', JSON.stringify(items));
  chores = JSON.parse(localStorage.getItem('listItem'));
  items.forEach(item => {
    list.innerHTML += `<div class="list__card">
    <div class="card__container">
    <button class="btn btn-done">Done</button> 
    <li class="card__item">${item}</li>
    </div>
    <div class="item__buttons">
    <button class="btn btn-edit">Edit</button>
    <button class="btn btn-delete">Delete</button>
    </div>
    </div>`;
  });

  // Add functionality to the generated delete buttons (functions.js)
  deleteButtonHandler();
  editButtonHandler();
  doneButtonHandler();
}

if (finishedItems === null || Object.entries(finishedItems).length === 0) {
  finishedPrompt.innerHTML = 'Nothing finished';
} else {
  localStorage.setItem('finishedItem', JSON.stringify(finishedItems));
  finished = JSON.parse(localStorage.getItem('finishedItem'));
  finishedItems.forEach(finishedItem => {
    finishedList.innerHTML += `<div class="list__card">
    <div class="card__container">
    <button class="btn btn-regret">Regret</button> 
    <li class="card__item">${finishedItem}</li>
    </div>
    <div class="item__buttons">
    <button class="btn btn-delete_finished">Delete</button>
    </div>
    </div>`;
  });

  deleteButtonHandler();
  regretButtonHandler();
}

inputForm.addEventListener('submit', function(event) {
  if (userInput.value.trim() === '') {
    window.alert('Gotta write something my man');
  } else {
    event.preventDefault();
    userPrompt.innerHTML = '';
    insertNewItem(userInput, chores, 'listItem');

    list.innerHTML += `<div class="list__card">
    <div class="card__container">
    <button class="btn btn-done">Done</button> 
    <li class="card__item">${getStoredItems('listItem').pop()}</li>
    </div>
    <div class="item__buttons">
    <button class="btn btn-edit">Edit</button>
    <button class="btn btn-delete">Delete</button>
    </div>
    </div>`;

    // Add functionality to the generated delete buttons (functions.js)
    deleteButtonHandler();
    editButtonHandler();
    doneButtonHandler();
  }
});
