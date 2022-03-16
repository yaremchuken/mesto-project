import Api from '../components/Api';
import FormValidator from '../components/FormValidator';
import PopupWithForm from '../components/PopupWithForm';
import PopupWithImage from '../components/PopupWithImage';
import Section from '../components/Section';
import UserInfo from '../components/UserInfo';
import Card from '../components/Card';
import { selectors } from '../utils/constants';
import { findById, showError } from '../utils/utils';
import './index.css';

const api = new Api('https://nomoreparties.co/v1/plus-cohort-6', {
  authorization: 'c677fa90-7905-4374-86f2-1b0b7555aa56',
  'Content-Type': 'application/json',
});

const userInfo = new UserInfo({
  userNameSelector: '.profile__title',
  userAboutSelector: '.profile__subtitle',
  avatarSelector: '.profile__avatar-img',
});

const section = new Section(
  {
    renderer: (card, container) => {
      container.prepend(card);
    },
  },
  '.cards__list'
);

/** Попапы */
const viewer = new PopupWithImage('#viewer-popup');
viewer.setEventListeners();

const avatarPopup = new PopupWithForm('#avatar-popup', (inputs) => {
  const link = findById(inputs, 'avatar-link');
  return api
    .updateAvatar(link.value)
    .then(() => userInfo.setAvatar(link.value))
    .catch(showError);
});

const profilePopup = new PopupWithForm(
  '#profile-popup',
  (inputs) => {
    const name = findById(inputs, 'name').value;
    const about = findById(inputs, 'appointment').value;

    return api
      .updateUserInfo({ name, about })
      .then(() => userInfo.setUserFields({ name, about }))
      .catch(showError);
  },
  () => {
    document.getElementById('name').value = userInfo.getName();
    document.getElementById('appointment').value = userInfo.getAbout();
  }
);

const cardPopup = new PopupWithForm('#card-popup', (inputs) => {
  const name = findById(inputs, 'title');
  const link = findById(inputs, 'link');

  return api
    .uploadCard(name.value, link.value)
    .then((cardData) => {
      section.addItem(createCard(cardData));
    })
    .catch(showError);
});

/** Валидаторы */
const avatarValidator = new FormValidator(selectors, '#avatar-popup');
const profileValidator = new FormValidator(selectors, '#profile-popup');
const cardValidator = new FormValidator(selectors, '#card-popup');

avatarValidator.enableValidation();
profileValidator.enableValidation();
cardValidator.enableValidation();

document.querySelector('.profile__avatar-edit').addEventListener('click', () => {
  avatarPopup.open();
  avatarValidator.validateOnOpen();
});

document.querySelector('.profile__btn-edit').addEventListener('click', () => {
  profilePopup.open();
  profileValidator.validateOnOpen();
});

document.querySelector('.profile__btn-add').addEventListener('click', () => {
  cardPopup.open();
  cardValidator.validateOnOpen();
});

/** Инициализация */
Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userInfoResponse, cardsResponse]) => {
    userInfo.setUserFields(userInfoResponse);
    section.renderItems(cardsResponse.reverse().map(createCard));
  })
  .catch(showError);

const createCard = (cardData) => {
  return new Card(
    cardData,
    '#card-template',
    () => {
      viewer.open(cardData.link, cardData.name);
    },
    userInfo.getId(),
    api,
    showError
  );
};
