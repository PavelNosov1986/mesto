import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupZoomImage= this._popup.querySelector('.popup__image');
    this._popupZoomText = this._popup.querySelector('.popup__image-title');
    }

    open(data) {
      this._popupZoomImage.src = data.link;
      this._popupZoomImage.alt = data.name;
      this._popupZoomImage.textContent = data.name;
      super.open();
    }
  }