import Api from '../components/Api';
import Card from '../components/Card';
import FormValidator from '../components/FormValidator';
import PopupWithForm from '../components/PopupWithForm';
import PopupWithImage from '../components/PopupWithImage';
import Section from '../components/Section';
import UserInfo from '../components/UserInfo';
import { selectors } from '../utils/constants';
import { showError } from '../utils/utils';
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
    renderer: (cardData) => {
      return createCard(cardData).generateCard();
    },
  },
  '.cards__list'
);

/** Попапы */
const viewer = new PopupWithImage('#viewer-popup');
viewer.setEventListeners();

const avatarPopup = new PopupWithForm('#avatar-popup', (inputs) => {
  return api
    .updateAvatar(inputs['avatar-link'])
    .then((data) => userInfo.setUserInfo(data))
    .catch(showError);
});

const profilePopup = new PopupWithForm(
  '#profile-popup',
  (inputs) => {
    return api
      .updateUserInfo({ name: inputs['name'], about: inputs['appointment'] })
      .then((data) => userInfo.setUserInfo(data))
      .catch(showError);
  },
  () => {
    document.getElementById('name').value = userInfo.getName();
    document.getElementById('appointment').value = userInfo.getAbout();
  }
);

const cardPopup = new PopupWithForm('#card-popup', (inputs) => {
  return api.uploadCard(inputs['title'], inputs['link']).then(section.addItem).catch(showError);
});

const formValidators = {};

// Включение валидации
const enableValidation = (selectors) => {
  const formList = Array.from(document.querySelectorAll(selectors.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(selectors, formElement);
    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name');

    // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(selectors);

document.querySelector('.profile__avatar-edit').addEventListener('click', () => {
  avatarPopup.open();
  formValidators['avatar-popup__form'].resetValidation();
});

document.querySelector('.profile__btn-edit').addEventListener('click', () => {
  profilePopup.open();
  formValidators['profile-popup__form'].resetValidation();
});

document.querySelector('.profile__btn-add').addEventListener('click', () => {
  cardPopup.open();
  formValidators['card-popup__form'].resetValidation();
});

/** Инициализация */
Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userInfoResponse, cardsResponse]) => {
    userInfo.setUserInfo(userInfoResponse);
    section.renderItems(cardsResponse.reverse());
  })
  .catch(showError);

const toggleLike = (card) => {
  if (card.getLikeButton().classList.contains('card__btn-like_active')) {
    api
      .unlikeCard(card.getID())
      .then((data) => {
        card.getLikeButton().classList.remove('card__btn-like_active');
        card.reloadLikes(data.likes.length);
      })
      .catch(showError);
  } else {
    api
      .likeCard(card.getID())
      .then((data) => {
        card.getLikeButton().classList.add('card__btn-like_active');
        card.reloadLikes(data.likes.length);
      })
      .catch(showError);
  }
};

const dropCard = (card) => {
  api
    .deleteCard(card.getID())
    .then(() => card.getElement().closest('.card').remove())
    .catch(showError);
};

const createCard = (cardData) => {
  return new Card(
    cardData,
    '#card-template',
    toggleLike,
    dropCard,
    () => {
      viewer.open(cardData.link, cardData.name);
    },
    userInfo.getId()
  );
};
