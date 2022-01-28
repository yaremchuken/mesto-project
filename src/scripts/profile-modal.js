/** Изменение данных профиля */

import { selectors } from '../index.js';
import { updateProfile } from './api.js';
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

  // Скидываем информация из формы обратно в профиль
  profileTitle.textContent = profilePopupName.value;
  profileSubtitle.textContent = profilePopupAppointment.value;

  const submitBtn = e.target.querySelector('.popup__btn-submit');
  submitBtn.textContent = 'Сохранение...';

  updateProfile({ name: profilePopupName.value, about: profilePopupAppointment.value })
    .then((_) => performOnPopupClose(profilePopup, submitBtn, selectors))
    .catch(showError);
});

export const handleProfileOpenClick = () => {
  // Предзаполняем поля формы информацией из профиля
  profilePopupName.value = profileTitle.textContent;
  profilePopupAppointment.value = profileSubtitle.textContent;

  toggleSubmitBtnState(form, selectors);
  openPopup(profilePopup);
};
