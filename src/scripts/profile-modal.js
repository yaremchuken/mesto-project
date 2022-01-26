/** Изменение данных профиля */

import { selectors } from '../index.js';
import { profileSubtitle, profileTitle } from './profile.js';
import { openPopup, closePopup } from './modal.js';
import { checkFormValid } from './validate.js';
import { updateProfile } from './api.js';

const profilePopup = document.querySelector('#profile-popup');
const profilePopupName = profilePopup.querySelector('#name');
const profilePopupAppointment = profilePopup.querySelector('#appointment');

profilePopup.querySelector('.popup__btn-close').addEventListener('click', () => {
  closePopup(profilePopup);
});

profilePopup.querySelector('.popup__form').addEventListener('submit', (e) => {
  e.preventDefault();
  if (!checkFormValid(e.target, selectors)) {
    return;
  }

  // Скидываем информация из формы обратно в профиль
  profileTitle.textContent = profilePopupName.value;
  profileSubtitle.textContent = profilePopupAppointment.value;

  const submitBtn = e.target.querySelector('.popup__btn-submit');
  submitBtn.textContent = 'Сохранение...';

  updateProfile({ name: profilePopupName.value, about: profilePopupAppointment.value }).then((_) => {
    submitBtn.textContent = 'Сохранить';
    closePopup(profilePopup);
  });
});

export const handleProfileOpenClick = () => {
  // Предзаполняем поля формы информацией из профиля
  profilePopupName.value = profileTitle.textContent;
  profilePopupAppointment.value = profileSubtitle.textContent;

  openPopup(profilePopup);
};
