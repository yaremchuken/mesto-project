import { prepareDatas } from './scripts/api';
import { handleAvatarOpenClick } from './scripts/avatar-modal';
import { handleCardModalOpenClick } from './scripts/card-modal';
import { closePopup } from './scripts/modal';
import { handleProfileOpenClick } from './scripts/profile-modal';
import { enableValidation } from './scripts/validate';
import './styles/index.css';

export const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-submit',
  inactiveButtonClass: 'popup__btn-submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible',
};

enableValidation(selectors);

document.addEventListener('keyup', (e) => {
  if (e.key !== 'Escape') {
    return;
  }
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

document.querySelector('.profile__btn-add').addEventListener('click', handleCardModalOpenClick);
document.querySelector('.profile__btn-edit').addEventListener('click', handleProfileOpenClick);
document.querySelector('.profile__avatar-edit').addEventListener('click', handleAvatarOpenClick);

prepareDatas();
