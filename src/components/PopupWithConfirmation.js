import {
    Popup
} from "./Popup.js";

export class PopupWithConfirmation extends Popup {
 
    // принимает коллбэк на удаление карточки
    submitCallback(removing) {      
        this._handleSubmit = removing;        
    }

    // удаление карточки по нажатию
    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {          
            evt.preventDefault();
            this._handleSubmit();
        });
    }
}