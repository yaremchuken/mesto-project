import '../styles/index.css';
import { getCards, getProfile } from './api';
import { handleAvatarOpenClick } from './avatar-modal';
import { initCards } from './card';
import { handleCardModalOpenClick } from './card-modal';
import { selectors } from './constants';
import { closePopup } from './modal';
import { initProfile } from './profile';
import { handleProfileOpenClick } from './profile-modal';
import { showError } from './utils';
import { enableValidation } from './validate';

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

Promise.all([getProfile, getCards])
  .then(([profile, cards]) => {
    initProfile(profile);
    initCards(cards);
  })
  .catch(showError);
