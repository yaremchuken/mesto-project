/** Отображение/скрытие попапа */
export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  setEventListeners() {
    document.querySelector(this._popupSelector).addEventListener('mousedown', (e) => {
      if (e.target.classList.contains('popup_opened')) {
        this.close();
      }
      if (e.target.classList.contains('popup__btn-close')) {
        this.close();
      }
    });
  }

  open() {
    document.querySelector(this._popupSelector).classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
  }

  close() {
    document.querySelector(this._popupSelector).classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => this._handleEscClose(evt));
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
}
