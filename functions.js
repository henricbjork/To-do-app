'use strict';
/**
 * Adds functionality to the delete buttons.
 * Selects all deletebuttons and gets parent div for each button
 * Then gets the index of the card item in each div
 * then removes the div and removes the item from the chores array based on the fetched index
 * then sets the new modified array to the local storage.
 *
 */

function deleteButtonHandler() {
  const deleteButtons = document.querySelectorAll('.btn-delete');

  deleteButtons.forEach(deleteButton => {
    deleteButton.addEventListener('click', e => {
      const card = deleteButton.closest('.list__card');
      const cardItemIndex = chores.indexOf(card.childNodes[1].innerText);

      card.remove();
      chores.splice(cardItemIndex, 1);

      localStorage.setItem('listItem', JSON.stringify(chores));
    });
  });
}

function editButtonHandler() {
  const deleteButtons = document.querySelectorAll('.btn-delete');
  const editButtons = document.querySelectorAll('.btn-edit');

  editButtons.forEach(editButton => {
    editButton.addEventListener('click', e => {
      //disables the rest of the buttons during edit mode
      editButtons.forEach(editButton => {
        editButton.disabled = true;
      });
      deleteButtons.forEach(deleteButton => {
        deleteButton.disabled = true;
      });

      const card = editButton.closest('.list__card');
      const cardItem = card.childNodes[1];
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
            card.replaceChild(cardItem, editField);
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
          }
        });
      });
    });
  });
}
