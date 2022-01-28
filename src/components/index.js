import { prepareDatas } from './api';
import { handleAvatarOpenClick } from './avatar-modal';
import { handleCardModalOpenClick } from './card-modal';
import { closePopup } from './modal';
import { handleProfileOpenClick } from './profile-modal';
import { showError } from './utils';
import { enableValidation } from './validate';
import '../styles/index.css';

export const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-submit',
  inactiveButtonClass: 'popup__btn-submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible',
};

enableValidation(selectors);

document.querySelectorAll('.popup').forEach((popup) => {
  popup.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (e.target.classList.contains('popup__btn-close')) {
      closePopup(popup);
    }
  });
});

document.querySelector('.profile__btn-add').addEventListener('click', handleCardModalOpenClick);
document.querySelector('.profile__btn-edit').addEventListener('click', handleProfileOpenClick);
document.querySelector('.profile__avatar-edit').addEventListener('click', handleAvatarOpenClick);

prepareDatas().catch(showError);
