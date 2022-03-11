export default class FormValidator {
  constructor(selectors, formSelector) {
    this._formSelector = formSelector;
    this._inputSelector = selectors.inputSelector;
    this._submitButton = document
      .querySelector(this._formSelector)
      .querySelector(selectors.submitButtonSelector);
    this._inactiveButtonClass = selectors.inactiveButtonClass;
    this._inputErrorClass = selectors.inputErrorClass;
    this._errorClass = selectors.errorClass;
    this._form = document.querySelector(this._formSelector);
    this._inputList = Array.from(
        this._form.querySelectorAll(this._inputSelector)
    );
  }

  _showInputError(input, errorMsg) {
    const errorEl = this._form.querySelector(
      `.${input.id}-input-error`
    );
    errorEl.textContent = errorMsg;
    errorEl.classList.add(this._errorClass);
  }

  _hideInputError(input) {
    input.classList.remove(this._inputErrorClass);
    const errorEl = this._form.querySelector(
        `.${input.id}-input-error`
      );
    errorEl.classList.remove(this._errorClass);
    errorEl.textContent = "";
  }

  _checkinputValidity(input) {
    const isInputValid = !input.validity.valid;
    if (isInputValid) {
      const errorMsg = input.validationMessage;
      this._showInputError(input, errorMsg);
    } else {
      this._hideInputError(input);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => !input.validity.valid);
  }

  _toggleSubmitBtnState() {
      if (this._hasInvalidInput()) {
        this._submitButton.classList.add(this._inactiveButtonClass);
        this._submitButton.disabled = true;
    } else {
        this._submitButton.classList.remove(this._inactiveButtonClass);
        this._submitButton.disabled = false;
    }
  }

  enableValidation() {
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkinputValidity(input);
        this._toggleSubmitBtnState();
      });
    });
  }
}
