/** Изменение данных профиля */

import api from './Api';
import { selectors } from './constants.js';
import { openPopup } from './modal.js';
import { profileSubtitle, profileTitle } from './profile.js';
import { performOnPopupClose, showError } from './utils.js';
import { checkFormValid, toggleSubmitBtnState } from './validate.js';

const profilePopup = document.querySelector('#profile-popup');
const profilePopupName = profilePopup.querySelector('#name');
const profilePopupAppointment = profilePopup.querySelector('#appointment');
const form = profilePopup.querySelector('.popup__form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!checkFormValid(e.target, selectors)) {
    return;
  }

  const submitBtn = e.submitter;
  submitBtn.textContent = 'Сохранение...';

  api
    .updateProfile({ name: profilePopupName.value, about: profilePopupAppointment.value })
    .then((_) => {
      profileTitle.textContent = profilePopupName.value;
      profileSubtitle.textContent = profilePopupAppointment.value;
      performOnPopupClose(profilePopup, selectors);
    })
    .catch(showError)
    .finally(() => (submitBtn.textContent = 'Сохранить'));
});

export const handleProfileOpenClick = () => {
  // Предзаполняем поля формы информацией из профиля
  profilePopupName.value = profileTitle.textContent;
  profilePopupAppointment.value = profileSubtitle.textContent;

  toggleSubmitBtnState(form, selectors);
  openPopup(profilePopup);
};
