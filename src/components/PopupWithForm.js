import { selectors } from './constants';
import Popup from './Popup';
import { showError } from './utils';

/** Попап формы */
export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this.setEventListeners();
  }

  setEventListeners() {
    super.setEventListeners();
    const form = document.querySelector(this._popupSelector).querySelector(selectors.formSelector);

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = e.submitter;
      submitBtn.textContent = 'Сохранение...';

      this._submitCallback(this._popupSelector)
        .catch(showError)
        .then(() => this.close())
        .finally(() => (submitBtn.textContent = 'Сохранить'));
    });
  }

  open() {
    const form = document.querySelector(this._popupSelector).querySelector(selectors.formSelector);
    super.open();
  }

  close() {
    super.close();
    this._clearForm();
  }

  _getInputValues() {
    return document
      .querySelector(this._popupSelector)
      .querySelectorAll(selectors.inputSelector)
      .map((input) => input.value);
  }

  _clearForm() {
    const popup = document.querySelector(this._popupSelector);
    popup.querySelectorAll(selectors.inputSelector).forEach((input) => (input.value = ''));
    popup.querySelectorAll(selectors.inputErrorSelector).forEach((input) => (input.textContent = ''));
  }
}
