// Открытие и закрытие попапов
const popup = document.querySelector('.popup');
const openPopupButtonEdit = document.querySelector('.profile__edit-button');
const openPopupButtonAddCards = document.querySelector('.profile__add-button');
const popupEdit = document.getElementById('edit');
const popupAddcards = document.getElementById('add-cards');
const closePopupButton = document.getElementById('close-edit');
const closePopupAddcards = document.getElementById('close-add-cards');
const popupImage = document.getElementById('image');

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

// Открытие попапа с картинкой

function openPopupImage(event) {
  const element = event.parentNode;
  const titleImg = element.querySelector('.element__title').textContent;
  const img = element.querySelector('.element__image').currentSrc;

  popupImage.querySelector('.popup__image-title').textContent = titleImg;
  popupImage.querySelector('.popup__image').src = img;

  popupImage.classList.add('popup_opened');

}

// Редактирование попап - edit
const formElement = document.querySelector('.popup__form');

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

//Шаблонные карточки
const cards = document.querySelector('.cards');
const template = document.querySelector('.template').content;

initialCards.forEach(function (element) {
  const card = template.cloneNode(true);
  const img = card.querySelector('.element__image');

  img.src = element.link;
  card.querySelector('.element__title').textContent = element.name;
  cards.appendChild(card);
});

// Создание новой карточки пользователем
function newCarde() {
  const card = template.cloneNode(true);
  const titleCard = document.getElementById('title').value;

  card.querySelector('.element__title').textContent = titleCard;
  const linkImageCard = document.getElementById('link-image').value;
  card.querySelector('.element__image').src = linkImageCard;
  cards.prepend(card);
}

// Открытие и закрытие новой карточки пользователем
const formAddCard = document.getElementById('popup__form-Add-card');
const linkImageCard = document.getElementById('link-image');

function formSubmitNewCard(event) {
  event.preventDefault();
  newCarde();
  popupClose('add-cards');
}
formAddCard.addEventListener('submit', formSubmitNewCard);

// Удаление карточки

function deleteCard(event) {
  const element = event.parentNode;

  element.remove();
}

// Подключение лайка

function likeActive(event) {
   //const element =
   event.classList.add('element__like_active');
  //const like = document.querySelector('.element__like');
  //element.classList.add('element__like_active');
}

