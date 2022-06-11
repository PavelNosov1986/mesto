export class Card {
  constructor(data, cardSelector, handleOpenImagePopup) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleOpenImagePopup = handleOpenImagePopup;
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
    // Добавим обработчики
    this._setEventListeners();
    // Добавим данные
    this._elementTitle = this._element.querySelector(".element__title").textContent = this._name;
    this._elementImage = this._element.querySelector(".element__image").src = this._link;
    this._deleteButtonCard = this._element.querySelector(".element__delete");
    this._likeButtonCard = this._element.querySelector(".element__like");
    // Вернём элемент наружу
    return this._element;
  }

  // Набор обработчиков
  _setEventListeners() {
    // Лайк
    this._element.querySelector(".element__like").addEventListener('click', () => {
      this._likeButtonCard.classList.toggle('element__like_active');
    });
    // Удаление карточки
    this._element.querySelector(".element__delete").addEventListener('click', () => {
      this._element.remove();
    });
    // Открываем картинку в размере 75% дисплея
    this._element.querySelector(".element__image").addEventListener('click', () => {
      this._handleOpenImagePopup(this._name, this._link);
    });
  }
}