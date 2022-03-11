import '../styles/index.css';
import api from './Api';
import { addToHolder, createCard, initCards } from './card';
import { selectors } from './constants';
import PopupWithForm from './PopupWithForm';
import PopupWithImage from './PopupWithImage';
import userInfo from './UserInfo';
import { showError } from './utils';
import { enableValidation } from './validate';
//import Card from './Card.js';
//import Section from './Section.js';

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

  return userInfo.setUserInfo({ name: name.value, about: appointment.value });
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

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userInfoResponse, cardsResponse]) => {
    userInfo.setUserFields(userInfoResponse);
    initCards(cardsResponse, viewer, userInfoResponse._id);
  })
  .catch(showError);










/*

//////// ФУНКЦИИ, СВЯЗАННЫЕ С CARD
// Контейнер для запихивания массива фоток
const cardsElement = document.querySelector('.elements'); 
const cardTemplate = document.querySelector('#card-template').content;

// Функция отрисовки фоток из массива на сайт через шаблон

const createCard = (data) => {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const elementImage = cardElement.querySelector('.element__image');
  elementImage.src = data.image;
  elementImage.alt = ' ';
  cardElement.querySelector('.element__caption').textContent = data.caption;
  cardElement.querySelector('.element__like-button').addEventListener('click', likeButtonHandler);
  cardElement.querySelector('.element__button-remove').addEventListener('click', removeElementHandler);
  cardElement.querySelector('.element__image').addEventListener('click', clickPreviewImage); // ПРИВЯЗАЛИ К КАРТИНКЕ НА КАРТОЧКЕ СЛУШАТЕЛЬ КЛИКОВ ПО ЭТОЙ КАРТИНКЕ

  return cardElement;
};

// Добавление и сохранение новой карточки
const cardCaption = formAddCard.querySelector('.popup__form-input-item_type_title');
const cardImage = formAddCard.querySelector('.popup__form-input-item_type_image-link');
const cardElement = cardTemplate.querySelector('.element').cloneNode(true);










// Создаем вспомогательную общую функцию createCard для получения экземпляра класса Card:
const createCard = (data) => {
  return new Card(data, '#card-template', clickPreviewImage);
}


// ПОДКЛЮЧЕНИЕ МАССИВА: Обойдем весь массив карточек с сервера и для каждого его элемента:
// 1) Получим экземпляр класса Card,
// 2) подготовим карточку к публикации
// 3) и добавим получившуюся карточку в DOM:
// ! ДОСТАТЬ СЕРВЕРНЫЕ КАРТОЧКИ ЧЕРЕЗ API
initialCards.forEach((cardData) => {
  const card = createCard(cardData);
  const cardElement = card.generateCard();
  cardsElement.prepend(cardElement);
});



//ДОБАВЛЕНИЕ И СОХРАНЕНИЕ НОВОЙ КАРТОЧКИ
// ФУНКЦИЯ СОХРАНЕНИЯ НОВОЙ КАРТОЧКИ ИЗ ПОПАПА


// Константа для попапа добавления карточки
const popupAddCard = document.querySelector('#card-popup');

// Константа формы для добавления новой карточки
const formAddCard = popupAddCard.querySelector('.popup__form');


const addNewCardData = (event) => {
  event.preventDefault();

  // Кладем значения попапа в "сундук" (объект) для их передачи в конструктор
  const data = {
    image: cardImage.value,
    caption: cardCaption.value
  };

// Получаем объект = экземпляр класса Card через вспомогательную общую функцию createCard:
  const card = createCard(data);

  // Готовим карточку к печати, используя публичный метод класса Card:
  const cardElement = card.generateCard();
  // Добавляем ее в DOM:
  cardsElement.prepend(cardElement);

  //Сбрасываем поля формы:
  formAddCard.reset();

  closePopup(event.target.closest('.popup'));

  // КНОПКУ САБМИТА ПОСЛЕ САБМИТА ФОРМЫ ДЕАКТИВИРУЕМ В ФАЙЛЕ VALIDATE.JS
}

// ВЫЗОЕМ ФУНКЦИЮ СОХРАНЕНИЯ НОВОЙ КАРТОЧКИ ИЗ ПОПАПА
formAddCard.addEventListener('submit', addNewCardData); 
*/







/*
//////// ФУНКЦИИ, СВЯЗАННЫЕ С SECTION
/*
const createCard = (cardData) => {
  const card = newCard(cardData, haldlers..., userID, 'Selector');

  return card.getView();
};

const cardSection = new Section (
  {
    renderer: (cardData) => {
      cardSection.addItem(createCard(cardData));
    },
  },
  '.cards'
);
*/