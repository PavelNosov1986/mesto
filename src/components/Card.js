export default class Card {
  constructor({
    data,
    handleCardClick
  }, cardSelector) {
    this._title = data.name;
    this._link = data.link;
    this._cardContainer = document.querySelector(cardSelector);
    this._handleCardClick = handleCardClick;
  }
  _getTemplate() {
    const cardTemplate = this._cardContainer.content
      .querySelector(".element")
      .cloneNode(true);
    return cardTemplate;
  }

  _handleDeliteCard(evt) {
    evt.target.closest('.element').remove();
  }

  _handleLikeCard(evt) {
    evt.target.classList.toggle('element__like_active');
  }

  _setEventListeners() {
    //Функция лайков
    this._card
      .querySelector('.element__like')
      .addEventListener("click", this._handleLikeCard);

    //Функция удаления карточек
    this._card
      .querySelector('.element__delete')
      .addEventListener("click", this._handleDeliteCard);

    this._newCardImage.addEventListener("click", () => {
      this._handleCardClick(this._title, this._link);
    });
  }

  generateNewCard() {
    this._card = this._getTemplate();
    this._card.querySelector('.element__title').textContent = this._title;
    this._newCardImage = this._card.querySelector('.element__image');
    this._newCardImage.src = this._link;
    this._newCardImage.alt = this._title;

    this._setEventListeners();

    return this._card;
  }
}