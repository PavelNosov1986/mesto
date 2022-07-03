import "./index.css";

import {
  Card
} from "../components/Card.js";

import {
  FormValidator
} from "../components/FormValidator.js";

import {
  Section
} from "../components/Section.js";

import {
  PopupWithImage
} from "../components/PopupWithImage.js";

import {
  PopupWithForm
} from "../components/PopupWithForm.js";

import {
  UserInfo
} from "../components/UserInfo.js";

import {
  initialCards,
  buttonOpenPopupEdit,
  buttonOpenPopupAddCards,
  buttonClosePopupEdit,
  buttonClosePopupAddCards,
  formEdit,
  formAddCard,
  nameInput,
  jobInput,
  validationSetup
} from "../utils/constants.js";

const validateFormProfile = new FormValidator(validationSetup, formEdit);
validateFormProfile.enableValidation();

const validateFormCard = new FormValidator(validationSetup, formAddCard);
validateFormCard.enableValidation();

// Открытие попапа - редактирование профиля 
buttonOpenPopupEdit.addEventListener('click', () => openPopupEdit());

// Открытие попапа - добавления карточки
buttonOpenPopupAddCards.addEventListener('click', () => {
  popupAddCard.open();
  validateFormCard.resetError();
});

// Закрытие попапа - редактирование профиля 
buttonClosePopupEdit.addEventListener('click', () => popupProfileEdit.close());

// Закрытие попапа - добавления карточек 
buttonClosePopupAddCards.addEventListener('click', () => popupAddCard.close());

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__about-me'
});

// Функция открытия попапа Edit 
function openPopupEdit() {
  const {
    name,
    job
  } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
  validateFormProfile.resetError();
  popupProfileEdit.open();
}

// Функция редактирования профиля 
function handleSubmitEditProfile(data) {
  const {
    name,
    description
  } = data;
  userInfo.setUserInfo(name, description);
  popupProfileEdit.close();
}

// Создаем шаблон карточки 
function createCard(data) {
  const cardElement = new Card(data, '.template', () =>
    popupImage.open(data.name, data.link));
  return cardElement.generateCard(data);
}

// Отрисовываем карточки   
function renderCard(data, cardContainer) {
  const newCard = createCard(data);
  cardContainer.prepend(newCard);
}

// Создаём первоначальные карточки(из первоначального массива) 
const section = new Section({
  items: initialCards,
  renderer: renderCard
}, '.cards');

section.rendererItems();

const handleSubmitAddCard = (data) => {
  const newCard = createCard({
    name: data["title"],
    link: data["linkImage"]
  });
  section.addItem(newCard);
  popupAddCard.close();
};

const popupImage = new PopupWithImage('.popup_for-image');
const popupAddCard = new PopupWithForm('#add-cards', handleSubmitAddCard);
const popupProfileEdit = new PopupWithForm('#edit', handleSubmitEditProfile);

popupImage.setEventListeners();
popupAddCard.setEventListeners();
popupProfileEdit.setEventListeners();