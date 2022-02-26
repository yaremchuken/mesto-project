import Popup from './Popup';

/** Попап просмотра изображения */
export default class PopupWithImage extends Popup {
  open(link, caption) {
    const popup = document.querySelector(this._popupSelector);
    const image = popup.querySelector('.viewer__image');
    const vCaption = popup.querySelector('.viewer__caption');

    image.src = link;
    image.alt = caption;
    vCaption.textContent = caption;

    super.open();
  }
}
