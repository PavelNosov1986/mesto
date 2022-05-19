// Массив начальных карточек при открытии страницы
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

const popup = document.querySelector('.popup');
const popupEdit = document.getElementById('edit');
const buttonOpenPopupEdit = document.querySelector('.profile__edit-button');

const popupAddcards = document.getElementById('add-cards');
const buttonOpenPopupAddCards = document.querySelector('.profile__add-button');

const popupImage = document.getElementById('image');
const imagePopupImage = popupImage.querySelector('.popup__image');
const titlePopupImage = popupImage.querySelector('.popup__image-title');
const buttonClosePopupImage = document.getElementById('close-image');

const buttonClosePopupEdit = document.getElementById('close-edit');
const buttonClosePopupAddCards = document.getElementById('close-add-cards');

const formEdit = document.querySelector('.popup__form');

const nameInput = document.getElementById('name');
const jobInput = document.getElementById('description');
const nameProfileEdit = document.querySelector('.profile__name');
const jobProfileEdit = document.querySelector('.profile__about-me');

const cards = document.querySelector('.cards');
const template = document.querySelector('.template').content;

const inputAddCard = document.getElementById('title');
const linkAddCard = document.getElementById('link-image');
const formAddCard = document.getElementById('popup__form-Add-card');

// Функция открытия попапов
function openPopup(element) {
  element.classList.add('popup_opened');
}

// Функция закрытия попапов
function closePopup(element) {
  element.classList.remove('popup_opened');
}

// Функция закрытия попапов overlay и esc
const heandleClosePopup = (evt) => {
  const openedPopup = document.querySelector('.popup_opened');

  if ((openedPopup && evt.key === 'Escape') || evt.target === openedPopup) {
    closePopup(openedPopup);
  }
};

// Закрытие попапов при overlay и esc
document.addEventListener('keydown', heandleClosePopup);
document.addEventListener('click', heandleClosePopup);


// Открытие попапа - редактирование профиля
buttonOpenPopupEdit.addEventListener('click', () => openPopup(popupEdit));

// Oткрытие попапа - добавления карточек
buttonOpenPopupAddCards.addEventListener('click', () => openPopup(popupAddcards));

// Закрытие попапа - редактирование профиля
buttonClosePopupEdit.addEventListener('click', () => closePopup(popupEdit));

// Закрытие попапа - добавления карточек
buttonClosePopupAddCards.addEventListener('click', () => closePopup(popupAddcards));

// Закрытие попапа - картинка в размере 75% дисплея
buttonClosePopupImage.addEventListener('click', () => closePopup(popupImage));

// Функция редактирования профиля
function handleSubmitEditProfile(event) {
  event.preventDefault();
  nameProfileEdit.textContent = nameInput.value;
  jobProfileEdit.textContent = jobInput.value;

  closePopup(popupEdit);

  event.target.reset();
}

formEdit.addEventListener('submit', handleSubmitEditProfile);

// Генерация карточки
const generateCard = (cardData) => {

  //Клонируем узел карточки
  const newCard = template.cloneNode(true);

  // Находим в DOM изображение карточки
  const cardImage = newCard.querySelector('.element__image');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  // Находим в DOM название карточки
  const cardName = newCard.querySelector('.element__title');

  cardName.textContent = cardData.name;

  // Подключаем лайк
  const likeButton = newCard.querySelector('.element__like');

  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('element__like_active');
  });

  // Открываем картинку в размере 75% дисплея
  cardImage.addEventListener('click', function () {
    titlePopupImage.textContent = cardName.textContent;
    imagePopupImage.src = cardImage.currentSrc;

    imagePopupImage.alt = cardName.innerText;

    openPopup(popupImage);
  });

  // Удаление карточек
  const elementForDelet = newCard.querySelector('.element');
  const buttonDelete = newCard.querySelector('.element__delete');

  buttonDelete.addEventListener('click', function () {
    elementForDelet.remove();
  });

  return newCard;
};

// Отрисовка карточек
const renderCard = (cardData) => {
  cards.prepend(generateCard(cardData));
};
initialCards.forEach((cardData) => {
  renderCard(cardData);
});

// Функция добавления карточки пользователем
const handleSubmitAddCard = (event) => {
  event.preventDefault();

  renderCard({
    link: linkAddCard.value,
    name: inputAddCard.value
  });

  closePopup(popupAddcards);

  event.target.reset();
};

formAddCard.addEventListener('submit', handleSubmitAddCard);