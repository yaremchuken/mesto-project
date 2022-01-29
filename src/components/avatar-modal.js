/** Изменение аватара */

import { updateAvatar } from './api.js';
import { selectors } from './constants.js';
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

  const submitBtn = e.submitter;
  submitBtn.textContent = 'Сохранение...';

  updateAvatar(avatarLink.value)
    .then((_) => {
      avatarImg.src = avatarLink.value;
      performOnPopupClose(profilePopup, selectors);
    })
    .catch(showError)
    .finally(() => (submitBtn.textContent = 'Сохранить'));
});

export const handleAvatarOpenClick = () => {
  avatarLink.value = '';
  toggleSubmitBtnState(form, selectors);
  openPopup(avatarPopup);
};
