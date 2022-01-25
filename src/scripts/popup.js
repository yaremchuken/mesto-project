import { addCard, createCard } from './card.js';

const cardPopup = document.querySelector('#card-popup');
const cardPopupTitle = cardPopup.querySelector('#title');
const cardPopupLink = cardPopup.querySelector('#link');

/** Отображение/скрытие попапа */

export const openPopup = (popup) => {
  smoothOpening(popup);
  popup.classList.add('popup_opened');
};

export const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
};

// Чтобы попап плавно появлялся и пропадал добавил ему transition
// при transition visibility 0s после закрытия попап сразу пропадает,
// при transition visibility 0.5s анимация исчезновения появляется при загрузке страницы,
// т.ч. добавляем транзакцию только после первого открытия попапа
const smoothOpening = (popup) => {
  if (!popup.classList.contains('overlay')) {
    popup.classList.add('overlay');
  }
};

/** Попап добавления карточки */

document.querySelector('.profile__btn-add').addEventListener('click', () => {
  // Чистим поля формы если они были заполнены ранее
  cardPopupTitle.value = '';
  cardPopupLink.value = '';

  openPopup(cardPopup);
});

cardPopup.querySelector('.popup__btn-close').addEventListener('click', () => {
  closePopup(cardPopup);
});

cardPopup.querySelector('.popup__form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = cardPopupTitle.value;
  const link = cardPopupLink.value;

  // Если форма заполнена правильно, то создаём и добавляем в DOM новую карточку
  if (title && link) {
    addCard(cardsHolder, createCard(title, link));
  } else return;

  closePopup(cardPopup);
});
