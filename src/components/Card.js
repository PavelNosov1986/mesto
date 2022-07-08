import { cardsApi } from "../api/cards";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation";

export class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes.length;
    this._ownerId = data.owner._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;

  }

  // Получаем разметку из template 
  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  // Генерируем карточку 
  generateCard() {
    // Запишем разметку в приватное поле _element.  
    this._element = this._getTemplate();

    // Добавим данные 
    this._elementTitle = this._element.querySelector(".element__title").textContent = this._name;
    this._elementImage = this._element.querySelector(".element__image");
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._buttonDeleteCard = this._element.querySelector(".element__delete");

    this._ownerId == "44d705ac118f4c83b55183a0" ?
      this._buttonDeleteCard.classList.add("element__delete-active") :
      this._buttonDeleteCard.classList.add("element__delete-inactive");

    this._likeButtonCard = this._element.querySelector(".element__like");
    this._likesElement = this._element.querySelector(".element__counter");
    this._likesElement.textContent = this._likes > 0 ? this._likes : "";

    // Добавим обработчики 
    this._setEventListeners();

    // Вернём элемент наружу 
    return this._element;
  }

  // Добаление лайка 
  _putLike() {
    if (this._likeButtonCard.classList.contains('element__like_active')) {
      cardsApi.fetchDeleteLikeCards(this._id).then((res) => {
        //debugger
        this._likesElement.textContent = res.likes.length > 0 ? res.likes.length : "";
        this._likeButtonCard.classList.toggle('element__like_active');
      })
    }
    else {
      cardsApi.fetchAddLikeCards(this._id).then((res) => {
        this._likesElement.textContent = res.likes.length;
        this._likeButtonCard.classList.toggle('element__like_active');

      })
    }

  }

  // Удаление карточки 
  _deleteCard() {
    deleteCardPopup.open();
    deleteCardPopup.submitCallback(() => {
      cardsApi.fetchDeleteCards(this._id).then((res) => {
        if (res)
          this._element.remove();
        deleteCardPopup.close();
      });
    });
  }

  // Набор обработчиков 
  _setEventListeners() {

    // Лайк 
    this._likeButtonCard.addEventListener('click', () => {
      this._putLike();
    });

    // Удаление карточки 
    this._buttonDeleteCard.addEventListener('click', () => {
      this._deleteCard();
    });

    // Открываем картинку в размере 75% дисплея 
    this._element.querySelector(".element__image").addEventListener('click', () => {
      this._handleCardClick();
    });
  }
}

const deleteCardPopup = new PopupWithConfirmation(
  '#confirmDelete'
);

deleteCardPopup.setEventListeners();