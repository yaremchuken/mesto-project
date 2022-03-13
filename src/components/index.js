import '../styles/index.css';
import api from './Api';
import { selectors } from './constants';
import FormValidator from './FormValidator';
import PopupWithForm from './PopupWithForm';
import PopupWithImage from './PopupWithImage';
import userInfo from './UserInfo';
import { showError } from './utils';
import Section from './Section';

const section = new Section(
  {
    renderer: (card, container) => {
      container.prepend(card);
    },
  },
  '.cards__list'
);

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

  return userInfo.setUserInfo({ name: name.value, about: appointment.value });
});

const cardPopup = new PopupWithForm('#card-popup', (popupSelector) => {
  const popup = document.querySelector(popupSelector);
  const name = popup.querySelector('#title').value;
  const link = popup.querySelector('#link').value;

  return api.uploadCard(name, link).then((cardData) => {
    section.addItem(cardData, viewer);
  });
});

new FormValidator(selectors, '#avatar-popup').enableValidation();
new FormValidator(selectors, '#profile-popup').enableValidation();
new FormValidator(selectors, '#card-popup').enableValidation();

document.querySelector('.profile__avatar-edit').addEventListener('click', () => avatarPopup.open());
document.querySelector('.profile__btn-edit').addEventListener('click', () => profilePopup.open());
document.querySelector('.profile__btn-add').addEventListener('click', () => cardPopup.open());

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userInfoResponse, cardsResponse]) => {
    userInfo.setUserId(userInfoResponse._id);
    userInfo.setUserFields(userInfoResponse);
    section.renderItems(cardsResponse.reverse(), viewer);
  })
  .catch(showError);
