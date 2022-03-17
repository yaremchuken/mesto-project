import Popup from './Popup';

/** Попап формы */
export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback, onOpenCallback) {
    super(popupSelector);

    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._popup.querySelectorAll('.popup__input');

    this._onOpenCallback = onOpenCallback;
    this._submitCallback = submitCallback;

    this.setEventListeners();
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = e.submitter;
      submitBtn.textContent = 'Сохранение...';

      this._submitCallback(this._getInputValues())
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
    this._formValues = {};
    this._inputs.forEach((input) => (this._formValues[input.name] = input.value));

    return this._formValues;
  }

  _clearFormFields() {
    this._inputs.forEach((input) => (input.value = ''));
  }
}
