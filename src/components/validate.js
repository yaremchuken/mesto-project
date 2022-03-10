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









/*

Заготовка класса FormValidator
export default class FormValidator {
  // Конструктор
    constructor(validationConfig, formElement) {
      // Настройки объекта конфиг
      this._inputSelector = validationConfig.inputSelector;
      this._submitButtonSelector = validationConfig.submitButtonSelector;
      this._disabledButtonClass = validationConfig.disabledButtonClass;
      this._inputErrorClass = validationConfig.inputErrorClass;
      this._errorClass = validationConfig.errorClass;

      // Параметр для проверяемого элемента формы:
      this._formElement = formElement;
      // Объявим классовую переменную для кнопки сабмита в данной форме:
      this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
      // В классовую переменную inputList сложили массив-коллекцию всех полей проверяемой формы:
      this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  }


  // Функция "добавить сообщение об ошибке", если инпут невалиден
_showInputError = (inputElement, errorElement) => {
  // Добавляем класс со стилями ошибки для инпута
  inputElement.classList.add(this._inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(this._errorClass);
};

// Функция "спрятать сообщение об ошибке", если инпут валиден
_hideInputError = (inputElement, errorElement) => {
  // Убираем класс со стилями ошибки для инпута
  inputElement.classList.remove(this._inputErrorClass);
  errorElement.classList.remove(this._errorClass);
  errorElement.textContent = '';
};

// Функция проверки инпута на валидность:
_checkInputValidity = (inputElement) => {
  // Объявляем переменную, в которую кладем сообщение об ошибке:
  const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
  // Если инпут невалиден, то покажем стиль ошибочного инпута и сообщение ошибки через вызов функции showInputError
  if (!inputElement.validity.valid) {
    this._showInputError(inputElement, errorElement);
    // А если инпут валиден, то не покажем = вызов функции hideInputError:
  } else {
    this._hideInputError(inputElement, errorElement);
  }
};

// Функция проверки: есть ли хотя бы один невалидный инпут?
_hasInvalidInput() {
  return this._inputList.some(inputElement => {
    // Методом some чекаем, можем ли мы хотя бы для одного инпута данной формы вернуть значение "невалидно":
    return !inputElement.validity.valid;
  });
};

// Функция проверки: а если все поля формы пустые?
_hasNotInputValues() {
  return this._inputList.every(inputElement => {
    return inputElement.value.length === 0;
  });
};

// Функция выключения кнопки сабмита:
_disableSubmitButton() {
  // Добавляем класс модификатора, дизейблящий кнопку
  this._buttonElement.classList.add(this._disabledButtonClass);
  this._buttonElement.disabled = true;
};

// Функция включения кнопки сабмита:
_enableSubmitButton() {
  // Удаляем класс модификатора, который дизейблил кнопку
  this._buttonElement.classList.remove(this._disabledButtonClass);
  this._buttonElement.disabled = false;
};

// Метод - переключатель состояния кнопки сабмита:
_toggleButtonState() {

  if (this._hasInvalidInput() || this._hasNotInputValues()) {
    this._disableSubmitButton();
  } else {
    this._enableSubmitButton();
  }
};

resetValidation() {
  this._toggleButtonState(); // Управляем кнопкой

  this._inputList.forEach((inputElement) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    this._hideInputError(inputElement, errorElement) // Пробегаемся по всем инпутам и очищаем ошибки
  });
}

// Навешиваем обработчики событий на проверяемую форму:
_setEventListeners() {

  // Вешаем на эту форму слушатель сабмита:
  this._formElement.addEventListener('submit', (event) => {
    // Отменяем действие сабмита по умолчанию
    event.preventDefault();
    // При событии сабмита формы деактивируем кнопку сабмита
    this._toggleButtonState();
  });


  // К каждому из полей формы (все поля собраны в массив-коллекцию, которая лежит в конструкторе)
  // применим слушатель события инпута. При инпутах будет каждый раз
  // вызываться метод _checkInputValidity (этот метод объявлен выше),
  // а затем - переключатель состояния кнопки сабмита всей формы (он тоже объявлена выше)
  this._inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      this._checkInputValidity(inputElement);
      this._toggleButtonState();
    });
  });

  this._toggleButtonState();
};

// Публичный метод, который вызывается в index.js у каждой формы и с которого начинается валидация:

enableValidation() {
  // Вызываем слушатели
  this._setEventListeners();
}

} // Конец класса FormValidator
*/