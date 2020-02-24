'use strict';

function insertNewItem(input, array, item) {
  array.push(input.value);
  input.value = '';
  localStorage.setItem(item, JSON.stringify(array));
}

function getStoredItems(item) {
  const items = JSON.parse(localStorage.getItem(item));
  return items;
}

function deleteStoredItem(array, text, item) {
  const index = array.indexOf(text);
  array.splice(index, 1);
  localStorage.setItem(item, JSON.stringify(array));
}

function deleteElement(element) {
  element.remove();
}

function deleteCard(text, array, item) {
  const cardItemIndex = array.indexOf(text);
  deleteStoredItem(array, cardItemIndex, item);
}

function editButtonHandler() {
  const deleteButtons = document.querySelectorAll('.btn-delete');
  const editButtons = document.querySelectorAll('.btn-edit');
  const doneButtons = document.querySelectorAll('.btn-done');

  editButtons.forEach(editButton => {
    editButton.addEventListener('click', e => {
      //disables the rest of the buttons during edit mode
      editButtons.forEach(editButton => {
        editButton.disabled = true;
      });
      deleteButtons.forEach(deleteButton => {
        deleteButton.disabled = true;
      });
      doneButtons.forEach(doneButton => {
        doneButton.disabled = true;
      });

      const card = editButton.closest('.list__card');
      const cardItem = card.childNodes[1].childNodes[3];
      const cardItemText = cardItem.innerText;

      comparer.push(cardItemText);

      localStorage.setItem('comparerItem', JSON.stringify(comparer));
      comparer = JSON.parse(localStorage.getItem('comparerItem'));
      const comparerItem = comparer[0];
      const cardItemIndex = chores.indexOf(comparerItem);

      const editField = document.createElement('input');
      editField.classList.add('input');

      const confirmButton = document.createElement('button');
      confirmButton.innerText = 'Confirm';
      confirmButton.classList.add('btn-confirm');

      editButton.parentNode.replaceChild(confirmButton, editButton);
      cardItem.parentNode.replaceChild(editField, cardItem);
      const confirmButtons = document.querySelectorAll('.btn-confirm');

      confirmButtons.forEach(confirmButton => {
        confirmButton.addEventListener('click', e => {
          if (editField.value.trim() === '') {
            window.alert('Gotta write something my man');
          } else {
            const editedValue = editField.value;
            card.childNodes[1].replaceChild(cardItem, editField);
            cardItem.innerHTML = editedValue;
            confirmButton.parentNode.replaceChild(editButton, confirmButton);
            chores.splice(cardItemIndex, 1, editedValue);
            localStorage.setItem('listItem', JSON.stringify(chores));
            localStorage.removeItem('comparerItem');

            comparer = [];

            //enables the rest of the buttons after edit mode
            editButtons.forEach(editButton => {
              editButton.disabled = false;
            });
            deleteButtons.forEach(deleteButton => {
              deleteButton.disabled = false;
            });
            doneButtons.forEach(doneButton => {
              doneButton.disabled = false;
            });
          }
        });
      });
    });
  });
}

function doneButtonHandler() {
  const doneButtons = document.querySelectorAll('.btn-done');

  doneButtons.forEach(doneButton => {
    doneButton.addEventListener('click', e => {
      const card = doneButton.parentNode.closest('.list__card');

      const cardItem = card.childNodes[1].childNodes[3].innerText;

      const cardItemIndex = chores.indexOf(cardItem);

      finished.push(cardItem);
      localStorage.setItem('finishedItem', JSON.stringify(finished));

      card.remove();
      chores.splice(cardItemIndex, 1);
      localStorage.setItem('listItem', JSON.stringify(chores));

      const finishedItems = JSON.parse(localStorage.getItem('finishedItem'));

      finishedList.innerHTML += `<div class="list__card">
      <div class="card__container">
      <button class="btn btn-regret">Regret</button>
      <li class="card__item">${finishedItems.pop()}</li>
      </div>
      <div class="item__buttons">
      <button class="btn btn-delete_finished">Delete</button>
      </div>
      </div>`;

      const deleteButtons = document.querySelectorAll('.btn-delete_finished');

      deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener('click', e => {
          const card = deleteButton.closest('.list__card');
          const cardText = card.childNodes[1].childNodes[3].innerText;

          deleteElement(card);
          deleteStoredItem(finished, cardText, 'finishedItem');
        });
      });
    });
  });
}
