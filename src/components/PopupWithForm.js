import { selectors } from '../utils/constants';
import Popup from './Popup';
import { showError } from '../utils/utils';

/** Попап формы */
export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback, onOpenCallback) {
    super(popupSelector);

    this._form = this._popup.querySelector(selectors.formSelector);
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
        .catch(showError)
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
    this._clearForm();
  }

  _getInputValues() {
    return Array.from(this._popup.querySelectorAll(selectors.inputSelector)).map((input) => {
      return { id: input.id, value: input.value };
    });
  }

  _clearForm() {
    this._popup.querySelectorAll(selectors.inputSelector).forEach((input) => (input.value = ''));
    this._popup.querySelectorAll(selectors.inputErrorSelector).forEach((input) => (input.textContent = ''));
  }
}
