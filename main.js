'use strict';
const template = `
<main>
<div class="header">
    <h1 class="header__text">To do list</h1>
</div>
    <form class="input_form">
    <label for="input_form__input">Input todo</label>
        <input type="text "name="input_form__input" id="input_form__input" class="input input_form__input" required>
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
let errors = [];

if (items === null || Object.entries(items).length === 0) {
  userPrompt.innerHTML = 'Add your first chore!';
} else {
  localStorage.setItem('listItem', JSON.stringify(items));
  chores = JSON.parse(localStorage.getItem('listItem'));
  items.forEach(item => {
    list.innerHTML += `<div class="list__card">
    <div class="card__container">
    <button class="btn btn-done"><img class="icon" src="/icons/notdone.svg"></button> 
    <li class="card__item">${item}</li>
    </div>
    <div class="item__buttons">
    <button class="btn btn-edit"><img class="icon" src="/icons/edit.svg"></button>
    <button class="btn btn-delete"><img class="icon" src="/icons/delete.svg"></button>
    </div>
    </div>`;
  });

  const deleteButtons = document.querySelectorAll('.btn-delete');

  deleteButtons.forEach(deleteButton => {
    deleteButton.addEventListener('click', e => {
      const card = deleteButton.closest('.list__card');
      const cardText = card.childNodes[1].childNodes[3].innerText;

      deleteElement(card);
      deleteStoredItem(chores, cardText, 'listItem');
    });
  });

  doneButtonHandler();
  editButtonHandler();
}

if (finishedItems === null || Object.entries(finishedItems).length === 0) {
  finishedPrompt.innerHTML = 'Nothing finished';
} else {
  localStorage.setItem('finishedItem', JSON.stringify(finishedItems));
  finished = JSON.parse(localStorage.getItem('finishedItem'));
  finishedItems.forEach(finishedItem => {
    finishedList.innerHTML += `<div class="list__card">
    <div class="card__container">
    <button class="btn btn-regret"><img class="icon" src="/icons/success.svg"></button> 
    <li class="card__item">${finishedItem}</li>
    </div>
    <div class="item__buttons">
    <button class="btn btn-delete_finished"><img class="icon" src="/icons/delete.svg"></button>
    </div>
    </div>`;
  });

  const deleteButtons = document.querySelectorAll('.btn-delete_finished');
  const regretButtons = document.querySelectorAll('.btn-regret');

  regretButtonHandler(regretButtons);

  deleteButtons.forEach(deleteButton => {
    deleteButton.addEventListener('click', e => {
      const card = deleteButton.closest('.list__card');
      const cardText = card.childNodes[1].childNodes[3].innerText;

      deleteElement(card);
      deleteStoredItem(finished, cardText, 'finishedItem');
    });
  });
}

inputForm.addEventListener('submit', function(event) {
  if (userInput.value.trim() === '') {
    errors.push(`This field can't be left empty`);
    displayErrorMessage();
  } else {
    event.preventDefault();
    userPrompt.innerHTML = '';
    console.log(typeof userInput);

    insertNewItem(userInput, chores, 'listItem');

    list.innerHTML += `<div class="list__card">
    <div class="card__container">
    <button class="btn btn-done"><img class="icon" src="/icons/notdone.svg"></button> 
    <li class="card__item">${getStoredItems('listItem').pop()}</li>
    </div>
    <div class="item__buttons">
    <button class="btn btn-edit"><img class="icon" src="/icons/edit.svg"></button>
    <button class="btn btn-delete"><img class="icon" src="/icons/delete.svg"></button>
    </div>
    </div>`;

    const deleteButtons = document.querySelectorAll('.btn-delete');

    deleteButtons.forEach(deleteButton => {
      deleteButton.addEventListener('click', e => {
        const card = deleteButton.closest('.list__card');
        const cardText = card.childNodes[1].childNodes[3].innerText;

        deleteElement(card);
        deleteStoredItem(chores, cardText, 'listItem');
      });
    });

    editButtonHandler();
    doneButtonHandler();
  }
});
