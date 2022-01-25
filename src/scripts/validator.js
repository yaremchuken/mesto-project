const showInputError = (form, input, errorMsg) => {
  input.classList.add('popup__input_type_error');

  const errorEl = form.querySelector(`.${input.id}-input-error`);
  errorEl.textContent = errorMsg;
  errorEl.classList.add('popup__input-error_active');
};

const hideInputError = (form, input) => {
  input.classList.remove('popup__input_type_error');

  const errorEl = form.querySelector(`.${input.id}-input-error`);
  errorEl.classList.remove('popup__input-error_active');
  errorEl.textContent = '';
};

export const hideFormErrors = (form) => {
  Array.from(form.querySelectorAll('.popup__input')).forEach((input) => hideInputError(form, input));
};

// Проверяем инпуты на ошибки, если они есть - выводим в соответствующее поле под инпутом.
const checkInputValidity = (form, input) => {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage);
  } else {
    hideInputError(form, input);
  }

  return input.validity.valid;
};

// Проверяем на ошибки всю форму.
export const checkFormValid = (form) => {
  return Array.from(form.querySelectorAll('.popup__input'))
    .map((input) => checkInputValidity(form, input))
    .reduce((a, b) => a && b);
};

export const hasInvalidInput = (inputs) => {
  return inputs.some((input) => !input.validity.valid);
};

export const toggleSubmitBtnState = (form) => {
  const button = form.querySelector('.popup__btn-submit');
  const inputs = Array.from(form.querySelectorAll('.popup__input'));
  if (hasInvalidInput(inputs)) {
    button.classList.add('button_inactive');
  } else {
    button.classList.remove('button_inactive');
  }
};

const setEventListeners = (form) => {
  const inputs = Array.from(form.querySelectorAll('.popup__input'));
  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(form, input);
      // на каждое изменение в импута вешаем проверку активности кнопки формы.
      toggleSubmitBtnState(form, inputs);
    });
  });
};

(() => {
  Array.from(document.querySelectorAll('.popup__form')).forEach((form) => setEventListeners(form));
})();
