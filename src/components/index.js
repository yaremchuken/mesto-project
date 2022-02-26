import '../styles/index.css';
import api from './Api';
import { addToHolder, createCard, initCards } from './card';
import { selectors } from './constants';
import PopupWithForm from './PopupWithForm';
import PopupWithImage from './PopupWithImage';
import { initProfile, profileSubtitle, profileTitle } from './profile';
import { showError } from './utils';
import { enableValidation } from './validate';

enableValidation(selectors);

const viewer = new PopupWithImage('#viewer-popup');
viewer.setEventListeners();

const avatarPopup = new PopupWithForm('#avatar-popup', (popupSelector) => {
  const link = document.querySelector(popupSelector).querySelector('#avatar-link');
  const img = document.querySelector('.profile__avatar-img');

  return api.updateAvatar(link.value).then(() => (img.src = link.value));
});

const profilePopup = new PopupWithForm('#profile-popup', (popupSelector) => {
  const popup = document.querySelector(popupSelector);
  const name = popup.querySelector('#name');
  const appointment = popup.querySelector('#appointment');

  return api.updateProfile({ name: name.value, about: appointment.value }).then(() => {
    profileTitle.textContent = name.value;
    profileSubtitle.textContent = appointment.value;
  });
});

const cardPopup = new PopupWithForm('#card-popup', (popupSelector) => {
  const popup = document.querySelector(popupSelector);
  const title = popup.querySelector('#title').value;
  const link = popup.querySelector('#link').value;

  return api.uploadCard(title, link).then((data) => {
    addToHolder(createCard(data._id, title, link, [], viewer));
  });
});

document.querySelector('.profile__avatar-edit').addEventListener('click', () => avatarPopup.open());
document.querySelector('.profile__btn-edit').addEventListener('click', () => profilePopup.open());
document.querySelector('.profile__btn-add').addEventListener('click', () => cardPopup.open());

Promise.all([api.getProfile(), api.getCards()])
  .then(([profile, cards]) => {
    initProfile(profile);
    initCards(cards, viewer);
  })
  .catch(showError);
