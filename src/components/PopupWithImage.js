import Popup from './Popup';

/** Попап просмотра изображения */
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popup.querySelector('.viewer__image');
    this._captionElement = this._popup.querySelector('.viewer__caption');
  }

  open(link, caption) {
    this._imageElement.src = link;
    this._imageElement.alt = caption;
    this._captionElement.textContent = caption;

    super.open();
  }
}
