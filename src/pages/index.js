import "./index.css";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";

import {
  initialCards,
  nameInput,
  jobInput,
  buttonOpenPopupEdit,
  buttonOpenPopupAddCards,
  profileForm,
  cardForm,
  validationSetup,
} from "../utils/constants.js";

//Инстанцирование class PopupWithImage и установка слушателей
const openPopupImage = new PopupWithImage(".popup_for-image");
openPopupImage.setEventListeners();

//Создаем шаблон карточки
function createCard(item) {
  const card = new Card({
      data: item,
      handleCardClick: () => {
        openPopupImage.open(item);
      },
    },
    ".template"
  );
  return card;
}

//Отрисовываем начальные карточки
const startCards = new Section({
    items: initialCards,
    renderer: (item) => {
      startCards.addItem(createCard(item).generateNewCard());
    },
  },
  ".cards"
);
startCards.renderItems();

//Инстанцирование class UserInfo
const userInfo = new UserInfo({
  name: ".profile__name",
  aboutMe: ".profile__about-me",
});

//Попап Edit
const profilePopupWithForm = new PopupWithForm({
  submitForm: (inputValues) => {
    userInfo.setUserInfo(inputValues);
    profilePopupWithForm.close();
  },
  popupSelector: "#edit",
});
profilePopupWithForm.setEventListeners();

//Слушатель  button Popup Edit
buttonOpenPopupEdit.addEventListener("click", () => {
  const userInformation = userInfo.getUserInfo();
  nameInput.value = userInformation.name;
  jobInput.value = userInformation.aboutMe;
  profilePopupWithForm.open();
  profileValidation.resetValidation();
});

//Попап Add Card
const cardPopupWithForm = new PopupWithForm({
  submitForm: (inputValues) => {
    inputValues["name"] = inputValues["imgname"];
    delete inputValues["imgname"];
    cardPopupWithForm.close();
    startCards.addItem(createCard(inputValues).generateNewCard());
  },
  popupSelector: "#add-cards",
});
cardPopupWithForm.setEventListeners();

//Слушатель button Popup Add Card
buttonOpenPopupAddCards.addEventListener("click", () => {
  cardPopupWithForm.open();
  cardValidation.resetValidation();
});

//Включение валидации в попапах
const profileValidation = new FormValidator(validationSetup, profileForm);
const cardValidation = new FormValidator(validationSetup, cardForm);
profileValidation.enableValidation();
cardValidation.enableValidation();

