import Popup from './Popup';

/** Попап формы */
export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback, showError, onOpenCallback) {
    super(popupSelector);

    this._form = this._popup.querySelector('.popup__form');
    this._onOpenCallback = onOpenCallback;
    this._submitCallback = submitCallback;

    this._showError = showError;

    this.setEventListeners();
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = e.submitter;
      submitBtn.textContent = 'Сохранение...';

      this._submitCallback(this._getInputValues())
        .catch(this._showError)
        .then(() => this.close())
        .finally(() => (submitBtn.textContent = 'Сохранить'));
    });
  }

  open() {
    super.open();
    if (this._onOpenCallback) {
      this._onOpenCallback();
    }
  }

  close() {
    super.close();
    this._clearFormFields();
  }

  _getInputValues() {
    return Array.from(this._popup.querySelectorAll('.popup__input')).map((input) => {
      return { id: input.id, value: input.value };
    });
  }

  _clearFormFields() {
    this._popup.querySelectorAll('.popup__input').forEach((input) => (input.value = ''));
  }
}
