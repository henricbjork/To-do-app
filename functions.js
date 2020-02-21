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
      const cardItemIndex = chores.indexOf(card.childNodes[0].innerHTML);
      card.remove();
      chores.splice(cardItemIndex, 1);
      localStorage.setItem('listItem', JSON.stringify(chores));
    });
  });
}

function editButtonHandler() {
  const editButtons = document.querySelectorAll('.btn-edit');

  editButtons.forEach(editButton => {
    editButton.addEventListener('click', e => {});
  });
}
