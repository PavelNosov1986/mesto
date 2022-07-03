// Массив начальных карточек при открытии страницы 

export const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },

  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },

  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },

  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },

  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },

  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const buttonOpenPopupEdit = document.querySelector('.profile__edit-button');

export const buttonOpenPopupAddCards = document.querySelector('.profile__add-button');

export const buttonClosePopupEdit = document.getElementById('close-edit');
export const buttonClosePopupAddCards = document.getElementById('close-add-cards');

export const formEdit = document.getElementById('popup__form-Edit');
export const formAddCard = document.getElementById('popup__form-Add-card');

export const nameInput = document.getElementById('name');
export const jobInput = document.getElementById('description');

export const validationSetup = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: '.popup__input-error',
  errorClass: 'popup__field-input_invalid'
};