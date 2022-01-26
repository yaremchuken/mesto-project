/** Манипуляции с карточками - добавление, удаление, лайки */

import { deleteCard, likeCard, unlikeCard } from './api';
import { viewImage } from './image-viewer';
import { profileId } from './profile';

const cardsHolder = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

// Создание карточки
export const createCard = (id, name, link, likes, removeable = true) => {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.card__title').textContent = name;
  cardElement.id = id;

  const imgElelemnt = cardElement.querySelector('.card__image');
  imgElelemnt.src = link;
  imgElelemnt.alt = name;

  cardElement.querySelector('.card__image').addEventListener('click', () => viewImage(link, name));
  cardElement.querySelector('.card__btn-like').addEventListener('click', toggleLike);

  if (likes?.find((like) => like._id === profileId)) {
    cardElement.querySelector('.card__btn-like').classList.add('card__btn-like_active');
  }

  reloadLikes(cardElement, likes?.length ?? 0);

  if (removeable) {
    const removeBtn = cardElement.querySelector('.card__btn-remove');
    removeBtn.addEventListener('click', (e) => dropCard(e, id));
    removeBtn.classList.add('card__btn-remove_visible');
  }

  return cardElement;
};

// Добавление карточки в компонент
export const addCard = (container, cardElement) => {
  container.prepend(cardElement);
};

export const addToHolder = (cardElement) => {
  addCard(cardsHolder, cardElement);
};

// Удаление карточки
const dropCard = (e, id) => {
  deleteCard(id).then((_) => e.target.closest('.card').remove());
};

// Переключение "лайка"
const toggleLike = (e) => {
  const card = e.target.closest('.card');
  if (e.target.classList.contains('card__btn-like_active')) {
    e.target.classList.remove('card__btn-like_active');
    unlikeCard(card.id).then((data) => reloadLikes(card, data.likes.length));
  } else {
    e.target.classList.add('card__btn-like_active');
    likeCard(card.id).then((data) => reloadLikes(card, data.likes.length));
  }
};

const reloadLikes = (card, likes) => {
  card.querySelector('.card__likes').textContent = likes;
};

export const initCards = (cards) => {
  cards.forEach((card) => {
    const removeable = card.owner._id === profileId;
    addCard(cardsHolder, createCard(card._id, card.name, card.link, card.likes, removeable));
  });
};
