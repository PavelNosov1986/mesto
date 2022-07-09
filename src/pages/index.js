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
  PopupWithConfirmation
} from "../components/PopupWithConfirmation";

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
  formUpdateAvatar
} from "../utils/constants.js";

import {
  Api
} from "../components/Api.js";

const apiHelper = new Api();

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


let currentUserId = "";

apiHelper.fetchGetMe().then((res) => {
  userInfo.setUserInfo(res.name, res.about, res.avatar);
  currentUserId = res._id;
});


// Функция редактирования профиля 
function handleSubmitEditProfile(data) {
  popupProfileEdit.renderLoading(true);

  apiHelper.fetchUpdateMe({
      name: data.name,
      about: data.description
    })
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about, res.avatar);
      popupProfileEdit.close();
    }).finally(() => {
      popupProfileEdit.renderLoading(false);
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
  const cardElement = new Card(data, '.template', currentUserId, () =>
    popupImage.open(data.name, data.link), () => {
      popupDeleteCard.open();
      popupDeleteCard.submitCallback(() => {
        apiHelper.fetchDeleteCards(data._id).then((res) => {
          if (res)
            cardElement.removeCard();
          popupDeleteCard.close();
        });
      });
    }, () => {
      if (cardElement._likeButtonCard.classList.contains('element__like_active')) {
        apiHelper.fetchDeleteLikeCards(data._id).then((res) => {
          cardElement._likesElement.textContent = res.likes.length > 0 ? res.likes.length : "";
          cardElement._likeButtonCard.classList.toggle('element__like_active');
        });
      } else {
        apiHelper.fetchAddLikeCards(data._id).then((res) => {
          cardElement._likesElement.textContent = res.likes.length;
          cardElement._likeButtonCard.classList.toggle('element__like_active');
        });
      }
    });
  return cardElement.generateCard(data);
}

// Создаём первоначальные карточки
const section = new Section({
  renderer: (data) => {
    section.addItem(createCard(data));
  }
}, '.cards');
apiHelper.fetchGetCards().then((res) => {
  section._items = res;
  section.rendererItems();
});

// Добавляем карточку пользователем
const handleSubmitAddCard = (data) => {
  popupAddCard.renderLoading(true);
  apiHelper.fetchPostCards({
    name: data["title"],
    link: data["linkImage"]
  }).then((res) => {
    section.addItem(createCard(res));
    popupAddCard.close();
  }).finally(() => {
    popupAddCard.renderLoading(false);
  });
};

// Меняем аватар
const handleSubmitUpdate = () => {
  popupAvatarUpdate.renderLoading(true);
  const url = document.querySelector('#linkAvatar').value;

  apiHelper.fetchUpdateAvatar({
      avatar: url
    })
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about, res.avatar);
      popupAvatarUpdate.renderLoading(false);
      popupAvatarUpdate.close();
    });
};

const popupImage = new PopupWithImage('.popup_for-image');
const popupAddCard = new PopupWithForm('#add-cards', handleSubmitAddCard);
const popupProfileEdit = new PopupWithForm('#edit', handleSubmitEditProfile);
const popupAvatarUpdate = new PopupWithForm('#updataAvatarForm', handleSubmitUpdate);
const popupDeleteCard = new PopupWithConfirmation('#confirmDelete');


popupImage.setEventListeners();
popupAddCard.setEventListeners();
popupProfileEdit.setEventListeners();
popupAvatarUpdate.setEventListeners();
popupDeleteCard.setEventListeners();