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

const popupEdit = document.getElementById('edit');
const buttonOpenPopupEdit = document.querySelector('.profile__edit-button');

const popupAddcards = document.getElementById('add-cards');
const buttonOpenPopupAddCards = document.querySelector('.profile__add-button');

const buttonClosePopupEdit = document.getElementById('close-edit');
const buttonClosePopupAddCards = document.getElementById('close-add-cards');

const formEdit = document.getElementById('popup__form-Edit');

const nameInput = document.getElementById('name');
const jobInput = document.getElementById('description');
const nameProfileEdit = document.querySelector('.profile__name');
const jobProfileEdit = document.querySelector('.profile__about-me');

const inputAddCard = document.getElementById('title');
const linkAddCard = document.getElementById('link-image');

const formAddCard = document.getElementById('popup__form-Add-card');

const popupImage = document.getElementById('image');
const imagePopupImage = popupImage.querySelector('.popup__image');
const titlePopupImage = popupImage.querySelector('.popup__image-title');
const buttonClosePopupImage = document.getElementById('close-image');

const cardContainer = document.querySelector('.cards');

const validationSetup = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_inactive',
    inputErrorClass: '.popup__input-error',
    errorClass: 'popup__field-input_invalid'
};

import {
    Card
} from "./Card.js";
import {
    FormValidator
} from "./FormValidator.js";

const validateFormProfile = new FormValidator(validationSetup, formEdit);
validateFormProfile.enableValidation();
const validateFormCard = new FormValidator(validationSetup, formAddCard);
validateFormCard.enableValidation();

// Функция открытия попапа Edit
function openPopupEdit() {
    formEdit.reset();
    nameInput.value = nameProfileEdit.textContent;
    jobInput.value = jobProfileEdit.textContent;
    validateFormProfile.resetError();
    openPopup(popupEdit);
}

// Функция закрытия попапов
function closePopup(element) {
    element.classList.remove('popup_opened');
    document.removeEventListener('keydown', heandleClosePopupEsc);
}

// Функция закрытия попапов esc
const heandleClosePopupEsc = (evt) => {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
};

// Функция закрытия попапов overlay 
const heandleClosePopupOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.currentTarget);
    }
};

// Функция добаления лайка
function putLike(element) {
    element.classList.toggle('element__like_active');
};

// Общая функция для открытия попапов 
function openPopup(element) {
    element.classList.add('popup_opened');
    document.addEventListener('keydown', heandleClosePopupEsc);
    element.addEventListener('click', heandleClosePopupOverlay);
}

// Открытие попапа - редактирование профиля
buttonOpenPopupEdit.addEventListener('click', () => openPopupEdit());

// Открытие попапа - картинка
function handleOpenImagePopup(name, link) {
    imagePopupImage.src = link;
    titlePopupImage.textContent = name;
    imagePopupImage.alt = name;
    openPopup(popupImage);
}

// Oткрытие попапа - добавления карточек
buttonOpenPopupAddCards.addEventListener('click', () => {
    formAddCard.reset();
    validateFormCard.resetError();
    openPopup(popupAddcards);
});

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
}

formEdit.addEventListener('submit', handleSubmitEditProfile);

// Создаем шаблон карточки
function createCard(data) {
    const cardElement = new Card(data, '.template', handleOpenImagePopup, putLike);
    return cardElement.generateCard(data);
}

// Отрисовываем карточки  
function renderCard(data) {
    const newCard = createCard(data);
    cardContainer.prepend(newCard);
}

// Создаём первоначальные карточки(из первоначального массива)
initialCards.forEach((item) => {
    renderCard(item);
});

// Добавляем новую карточку
buttonOpenPopupAddCards.addEventListener('click', () => openPopup(popupAddcards));

const handleSubmitAddCard = (event) => {

    event.preventDefault();

    renderCard({
        name: inputAddCard.value,
        link: linkAddCard.value
    });
    closePopup(popupAddcards);

};
formAddCard.addEventListener('submit', handleSubmitAddCard);