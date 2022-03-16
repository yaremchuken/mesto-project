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

  // Функция проверки: а если все поля формы пустые?
_hasNotInputValues() {
  return this._inputList.every(input => {
    return input.value.length === 0;
  });
};

  _toggleSubmitBtnState() {
      if (this._hasInvalidInput() || this._hasNotInputValues()) {
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













/*

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



// Объект конфиг, в котором передаем все необходимые селекторы:
const validationConfig = {
  inputSelector: '.popup__form-input-item', // Инпут в попапе
  submitButtonSelector: '.popup__submit-button', // Кнопка сабмита
  disabledButtonClass: 'popup__submit-button_disabled', // Класс, который дизейблит кнопку сабмита
  inputErrorClass: 'popup__form-input-item_type_error', // Класс, который делает неправильному инпуту спецобводку
  errorClass: 'error_visible' // Класс со стилями, который при ошибке делает видимым сообщение об ошибке
};
*/

