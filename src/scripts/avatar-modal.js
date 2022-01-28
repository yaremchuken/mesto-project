/** Изменение аватара */

import { selectors } from '../index.js';
import { updateAvatar } from './api.js';
import { openPopup } from './modal.js';
import { performOnPopupClose, showError } from './utils.js';
import { checkFormValid, toggleSubmitBtnState } from './validate.js';

const avatarPopup = document.querySelector('#avatar-popup');
const avatarLink = avatarPopup.querySelector('#avatar-link');
const avatarImg = document.querySelector('.profile__avatar-img');
const form = avatarPopup.querySelector('.popup__form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!checkFormValid(e.target, selectors)) {
    return;
  }

  avatarImg.src = avatarLink.value;

  const submitBtn = e.target.querySelector('.popup__btn-submit');
  submitBtn.textContent = 'Сохранение...';

  updateAvatar(avatarLink.value)
    .then((_) => performOnPopupClose(avatarPopup, submitBtn, selectors))
    .catch(showError);
});

export const handleAvatarOpenClick = () => {
  avatarLink.value = '';
  toggleSubmitBtnState(form, selectors);
  openPopup(avatarPopup);
};
