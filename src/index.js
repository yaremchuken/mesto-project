import './styles/index.css';

// import './scripts/validate';
// import './scripts/card';
// import './scripts/image-viewer';
// import './scripts/modal';
// import './scripts/profile-modal';
// import './scripts/card-modal';
import { closePopup } from './scripts/modal';
import { checkInputValidity, toggleSubmitBtnState } from './scripts/validate';

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
});

document.addEventListener('keyup', (e) => {
  const popup = document.querySelector('.popup_opened');
  if (popup) {
    closePopup(popup);
  }
});

document.querySelectorAll('.popup').forEach((popup) => {
  popup.addEventListener('click', (e) => {
    e.stopPropagation();
    if (e.target.classList.contains('overlay')) {
      closePopup(popup);
    }
  });
});

Array.from(document.querySelectorAll('.popup__form')).forEach((form) => {
  const inputs = Array.from(form.querySelectorAll('.popup__input'));
  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(form, input);
      // на каждое изменение в импута вешаем проверку активности кнопки формы.
      toggleSubmitBtnState(form, inputs);
    });
  });
});
