/** Изменение данных профиля */

import { openPopup, closePopup } from './popup.js';
import { checkFormValid } from './validator.js';

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const profilePopup = document.querySelector('#profile-popup');
const profilePopupName = profilePopup.querySelector('#name');
const profilePopupAppointment = profilePopup.querySelector('#appointment');

document.querySelector('.profile__btn-edit').addEventListener('click', () => {
  // Предзаполняем поля формы информацией из профиля
  profilePopupName.value = profileTitle.textContent;
  profilePopupAppointment.value = profileSubtitle.textContent;

  openPopup(profilePopup);
});

profilePopup.querySelector('.popup__btn-close').addEventListener('click', () => {
  closePopup(profilePopup);
});

profilePopup.querySelector('.popup__form').addEventListener('submit', (e) => {
  e.preventDefault();
  if (!checkFormValid(e.target)) {
    return;
  }

  // Скидываем информация из формы обратно в профиль
  profileTitle.textContent = profilePopupName.value;
  profileSubtitle.textContent = profilePopupAppointment.value;

  closePopup(profilePopup);
});