// Открытие и закрытие попапов
const popup = document.querySelector('.popup');
const openPopupButtonEdit = document.querySelector('.profile__edit-button');
const openPopupButtonAddCards = document.querySelector('.profile__add-button');
const popupEdit = document.getElementById('edit');
const popupAddcards = document.getElementById('add-cards');
const closePopupButton = document.getElementById('close-edit');
const closePopupAddcards = document.getElementById('close-add-cards');

function popupOpen(element) {
  element.classList.add('popup_opened');
}

function popupClose(id) {  
  document.getElementById(id).classList.remove('popup_opened');
}

function popupOpenToggleEdit() {
  popupOpen(popupEdit);
  document.getElementById('name').value = document.querySelector('.profile__name').textContent;
  document.getElementById('description').value = document.querySelector('.profile__about-me').textContent;
}

function popupOpenToggleAddCards() {
  popupOpen(popupAddcards);
}

// Редактирование попап - edit
const formElement = document.querySelector('.popup__form');
const nameInput = document.getElementById('name');
const jobInput = document.getElementById('description');

function formSubmitHandler(event) {
  event.preventDefault();
  const nameInput = document.getElementById('name').value;
  const jobInput = document.getElementById('description').value;
  document.querySelector('.profile__name').textContent = nameInput;
  document.querySelector('.profile__about-me').textContent = jobInput;
  popupClose('edit');
 }
formElement.addEventListener('submit', formSubmitHandler);

// Начальные карточки при открытии страницы
const initialCards = [{
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

//Шаблоны

const cards = document.querySelector('.cards');
const template = document.querySelector('.template').content;

initialCards.forEach(function (element) {
  const card = template.cloneNode(true);
  const img = card.querySelector('.element__image');
  img.src = element.link;
  card.querySelector('.element__title').textContent = element.name;
  cards.appendChild(card);
});

// Создание новой карточки
function newCarde() {
  const firstCarde = cards.cloneNode(true);
  cards.appendChild(firstCarde);

}
 newCarde();