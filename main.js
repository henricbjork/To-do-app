'use strict';
const template = `
<main>
<div class="header">
    <div class="date">
    <p class="date__day">${day}<p>
    <div class="date__my">
    <p>${month}</p>
    <p>${year}</p>
    </div>
    </div>

    <div class="weekday">
    <p>${weekDay}</p>
    </div>
</div>
    <form class="input_form">
    <label for="input_form__input">Input todo</label>
        <input type="text "name="input_form__input" id="input_form__input" class="input input_form__input" required>
        <button type="submit" class="btn input_form__button">Submit</button>
    </form>
    <p class="user_prompt"></p>
    <ul class="list">
    </ul>
    
    <section class="completed">
    <h1>completed</h1>
    <p class="finished_prompt"></p>
    <ul class="finished_list">
    </ul>
    </section>
    <div class="test">
    <button class="btn btn-add">Add</button>
    </div>
    </main>
`;
document.body.innerHTML = template;

const submitButton = document.querySelector('.input_form__button');
const addButton = document.querySelector('.btn-add');
const test = document.querySelector('.test');
const userInput = document.querySelector('.input_form__input');
const userPrompt = document.querySelector('.user_prompt');
const list = document.querySelector('.list');
const inputForm = document.querySelector('.input_form');
const listCards = document.querySelectorAll('.list__card');
const finishedList = document.querySelector('.finished_list');
const items = JSON.parse(localStorage.getItem('listItem'));
const finishedItems = JSON.parse(localStorage.getItem('finishedItem'));
const finishedPrompt = document.querySelector('.finished_prompt');

addButton.addEventListener('click', e => {
  const popup = document.createElement('div');
  addClass(popup, 'popup');
  const form = document.createElement('form');
  addClass(form, 'input_form');
  const label = document.createElement('label');
  label.setAttribute('for', 'input_form__input');
  const inputt = document.createElement('input');
  addClass(inputt, 'input_form__input');
  inputt.setAttribute('type', 'text');
  inputt.setAttribute('name', 'input_form__input');
  const buttonn = document.createElement('button');
  addClass(buttonn, 'input_form__button');
  buttonn.setAttribute('type', 'submit');

  form.appendChild(label);
  form.appendChild(inputt);
  form.appendChild(buttonn);

  popup.appendChild(form);

  test.appendChild(popup);

  form.addEventListener('submit', function(event) {
    if (inputt.value.trim() === '') {
      errors.push(`This field can't be left empty`);
      displayErrorMessage();
    } else {
      event.preventDefault();
      userPrompt.innerHTML = '';

      insertNewItem(inputt, chores, 'listItem');

      deleteElement(popup);

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
});

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

// addButton.addEventListener('click', e => {
//   const popup = document.createElement('div');
//   addClass(popup, 'popup');
//   const form = document.createElement('form');
//   addClass(form, 'input_form');
//   const label = document.createElement('label');
//   label.setAttribute('for', 'input_form__input');
//   const inputt = document.createElement('input');
//   addClass(inputt, 'input_form__input');
//   inputt.setAttribute('type', 'text');
//   inputt.setAttribute('name', 'input_form__input');
//   const buttonn = document.createElement('button');
//   addClass(buttonn, 'input_form__button');
//   buttonn.setAttribute('type', 'submit');

//   form.appendChild(label);
//   form.appendChild(inputt);
//   form.appendChild(buttonn);

//   popup.appendChild(form);

//   test.appendChild(popup);

//   // <form class="input_form">
//   //   <label for="input_form__input">Input todo</label>
//   //       <input type="text "name="input_form__input" id="input_form__input" class="input input_form__input" required>
//   //       <button type="submit" class="btn input_form__button">Submit</button>
//   //   </form>
// });
