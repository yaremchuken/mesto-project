const showInputError = (form, input, selectors, errorMsg) => {
  input.classList.add(selectors.inputErrorClass);

  const errorEl = form.querySelector(`.${input.id}-input-error`);
  errorEl.textContent = errorMsg;
  errorEl.classList.add(selectors.errorClass);
};

const hideInputError = (form, input, selectors) => {
  input.classList.remove(selectors.inputErrorClass);

  const errorEl = form.querySelector(`.${input.id}-input-error`);
  errorEl.classList.remove(selectors.errorClass);
  errorEl.textContent = '';
};

export const hideFormErrors = (form, selectors) => {
  Array.from(form.querySelectorAll(selectors.inputSelector)).forEach((input) => hideInputError(form, input, selectors));
};

// Проверяем инпуты на ошибки, если они есть - выводим в соответствующее поле под инпутом.
export const checkInputValidity = (form, input, selectors) => {
  if (!input.validity.valid) {
    showInputError(form, input, selectors, input.validationMessage);
  } else {
    hideInputError(form, input, selectors);
  }

  return input.validity.valid;
};

// Проверяем на ошибки всю форму.
export const checkFormValid = (form, selectors) => {
  return Array.from(form.querySelectorAll(selectors.inputSelector))
    .map((input) => checkInputValidity(form, input, selectors))
    .reduce((a, b) => a && b);
};

export const hasInvalidInput = (inputs) => {
  return inputs.some((input) => !input.validity.valid);
};

export const toggleSubmitBtnState = (form, selectors) => {
  const button = form.querySelector(selectors.submitButtonSelector);
  const inputs = Array.from(form.querySelectorAll(selectors.inputSelector));
  if (hasInvalidInput(inputs)) {
    button.classList.add(selectors.inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(selectors.inactiveButtonClass);
    button.disabled = false;
  }
};

export const enableValidation = (selectors) => {
  document.querySelectorAll(selectors.formSelector).forEach((form) => {
    const inputs = Array.from(form.querySelectorAll(selectors.inputSelector));
    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        checkInputValidity(form, input, selectors);
        // на каждое изменение в импута вешаем проверку активности кнопки формы.
        toggleSubmitBtnState(form, selectors);
      });
    });
  });
};
