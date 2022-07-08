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
  buttonOpenPopupEdit,
  buttonOpenPopupAddCards,
  buttonClosePopupEdit,
  buttonClosePopupAddCards,
  formEdit,
  formAddCard,
  nameInput,
  jobInput,
  validationSetup,
  buttonUpdateNewAvatar,
  formUpdateAvatar,
  buttoPopupSaveEdit,
  buttoPopupSaveAddCard
} from "../utils/constants.js";

import {
  cardsApi
} from "../api/cards";
import {
  usersApi
} from "../api/users";

const validateFormProfile = new FormValidator(validationSetup, formEdit);
validateFormProfile.enableValidation();

const validateFormCard = new FormValidator(validationSetup, formAddCard);
validateFormCard.enableValidation();

const validateFormAvatarUpdate = new FormValidator(validationSetup, formUpdateAvatar);
validateFormAvatarUpdate.enableValidation();

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

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__about-me'
});

usersApi.fetchGetMe().then((res) => {
  //console.log(res);
  userInfo.setUserInfo(res.name, res.about, res.avatar);
});

// Функция редактирования профиля 
function handleSubmitEditProfile(data) {
  
  buttoPopupSaveEdit.textContent = "Сохранение...";

  usersApi.fetchUpdateMe({
    name: data.name,
    about: data.description
  }).then((res) => {
    userInfo.setUserInfo(res.name, res.about, res.avatar);
    buttoPopupSaveEdit.textContent = "Сохранение";
    popupProfileEdit.close();
  });

}

// Открытие попапа - редактирование профиля 
buttonOpenPopupEdit.addEventListener('click', () => openPopupEdit());

// Открытие попапа - добавления карточки
buttonOpenPopupAddCards.addEventListener('click', () => {
  popupAddCard.open();
  validateFormCard.resetError();
});

//  Открытие попапа - смены аватара
buttonUpdateNewAvatar.addEventListener('click', () => {
  popupAvatarUpdate.open();
  validateFormAvatarUpdate.resetError();
});

// Закрытие попапа - редактирование профиля 
buttonClosePopupEdit.addEventListener('click', () => popupProfileEdit.close());

// Закрытие попапа - добавления карточек 
buttonClosePopupAddCards.addEventListener('click', () => popupAddCard.close());

// Создаем шаблон карточки 
function createCard(data) {
  const cardElement = new Card(data, '.template', () =>
    popupImage.open(data.name, data.link));
  return cardElement.generateCard(data);
}

// Создаём первоначальные карточки
const section = new Section({
  renderer: (data) => {
    section.addItem(createCard(data));
  }
}, '.cards');

cardsApi.fetchGetCards().then((res) => {
    section._items = res;
  section.rendererItems();
});

// Добавляем картоку пользователем
const handleSubmitAddCard = (data) => {
  buttoPopupSaveAddCard.textContent = "Сохранение..."
  cardsApi.fetchPostCards({
    name: data["title"],
    link: data["linkImage"]
  }).then((res) => {
    section.addItem(createCard(res));
    buttoPopupSaveAddCard.textContent = "Сохранение"
    popupAddCard.close();
  });  
};

// Меняем аватар
const handleSubmitUpdate = () => {
  const url = document.querySelector('#linkAvatar').value;
  usersApi.fetchUpdateAvatar({
    avatar: url
  }).then((res) => {
    userInfo.setUserInfo(res.name, res.about, res.avatar);
  });
  popupAvatarUpdate.close();
};

const popupImage = new PopupWithImage('.popup_for-image');
const popupAddCard = new PopupWithForm('#add-cards', handleSubmitAddCard);
const popupProfileEdit = new PopupWithForm('#edit', handleSubmitEditProfile);
const popupAvatarUpdate = new PopupWithForm('#updataAvatarForm', handleSubmitUpdate);

popupImage.setEventListeners();
popupAddCard.setEventListeners();
popupProfileEdit.setEventListeners();
popupAvatarUpdate.setEventListeners();