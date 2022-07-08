import {
    Popup
} from "./Popup.js";

export class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._buttonDeleteCard = this._popup.querySelector('#submitConfirmDelete');
    }

    // принимает коллбэк на удаление карточки
    submitCallback(removing) {
        this._handleSubmit = removing;
    }

    // удаление карточки по нажатию
    setEventListeners() {
        super.setEventListeners();
        this._buttonDeleteCard.addEventListener('click', () => {
            this._handleSubmit();
        });
    }
}