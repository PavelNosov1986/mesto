import {
    Popup
} from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector);
        this._image = this._popup.querySelector('.popup__image');
        this._imageTitle = this._popup.querySelector('.popup__image-title');
    }
    open(text, link) {
        super.open();
        this._image.src = link;
        this._imageTitle.textContent = text;
        this._image.alt = text;
    }
}