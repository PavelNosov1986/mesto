export default class Popup {

    constructor(popupSelector) {
       
        this._popup = document.querySelector(popupSelector);
        this._escClose = this._handleEscClose.bind(this);
    }

    // Открытие попапов
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener("keydown", this._escClose);
    }

    // Закрытие попапов
    close() {
        document.removeEventListener("keydown", this._escClose);
        this._popup.classList.remove('popup_opened');
    }

    // Закрытие попапов esc
    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    // Закрытие попапов оверлэй
    _handleClosePopupOverlay = (evt) => {
        if (evt.target === evt.currentTarget) {
            this.close();
        }
    };

    // Слушатели на иконке закрытия попапов
    setEventListeners() {
        const buttonIconClosePopup = this._popup.querySelector('.popup__close');
        buttonIconClosePopup.addEventListener('click', () => this.close(this._popup));
        this._popup.addEventListener("click", this._handleClosePopupOverlay);
    }
}