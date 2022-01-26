/** Изменение аватара */

import { selectors } from '../index.js';
import { updateAvatar } from './api.js';
import { closePopup, openPopup } from './modal.js';
import { checkFormValid } from './validate.js';

const avatarPopup = document.querySelector('#avatar-popup');
const avatarLink = avatarPopup.querySelector('#avatar-link');
const avatarImg = document.querySelector('.profile__avatar-img');

avatarPopup.querySelector('.popup__btn-close').addEventListener('click', () => {
  closePopup(avatarPopup);
});

avatarPopup.querySelector('.popup__form').addEventListener('submit', (e) => {
  e.preventDefault();
  if (!checkFormValid(e.target, selectors)) {
    return;
  }

  avatarImg.src = avatarLink.value;

  const submitBtn = e.target.querySelector('.popup__btn-submit');
  submitBtn.textContent = 'Сохранение...';

  updateAvatar(avatarLink.value).then((_) => {
    submitBtn.textContent = 'Сохранить';
    closePopup(avatarPopup);
  });
});

export const handleAvatarOpenClick = () => {
  avatarLink.value = avatarImg.src;
  openPopup(avatarPopup);
};
