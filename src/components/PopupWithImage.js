import {
    Popup
} from "./Popup.js";

export class PopupWithImage extends Popup {
    open(text, link) {
        super.open();
        const image = this._popup.querySelector('.popup__image');
        const imageTitle = this._popup.querySelector('.popup__image-title');

        image.src = link;
        imageTitle.textContent = text;
    }
}