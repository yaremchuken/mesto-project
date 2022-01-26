/** Манипуляции с карточками - добавление, удаление, лайки */

import { viewImage } from './image-viewer';

const initialCards = [
  {
    name: 'Отголоски далёкого прошлого',
    link: 'https://images-assets.nasa.gov/image/PIA09219/PIA09219~medium.jpg',
  },
  {
    name: 'Орион',
    link: 'https://images-assets.nasa.gov/image/PIA04227/PIA04227~small.jpg',
  },
  {
    name: 'Бетельгейзе',
    link: 'https://images-assets.nasa.gov/image/PIA16680/PIA16680~orig.jpg',
  },
  {
    name: 'Андромеда',
    link: 'https://images-assets.nasa.gov/image/PIA15416/PIA15416~medium.jpg',
  },
  {
    name: 'Петля Лебедя',
    link: 'https://images-assets.nasa.gov/image/PIA15415/PIA15415~medium.jpg',
  },
  {
    name: 'Галактика Центавра',
    link: 'https://images-assets.nasa.gov/image/PIA04624/PIA04624~medium.jpg',
  },
];

export const cardsHolder = document.querySelector('.cards__list');

const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

// Создание карточки
export const createCard = (name, link) => {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.card__title').textContent = name;

  const imgElelemnt = cardElement.querySelector('.card__image');
  imgElelemnt.src = link;
  imgElelemnt.alt = name;

  cardElement.querySelector('.card__image').addEventListener('click', () => viewImage(link, name));
  cardElement.querySelector('.card__btn-like').addEventListener('click', toggleLike);
  cardElement.querySelector('.card__btn-remove').addEventListener('click', dropCard);

  return cardElement;
};

// Добавление карточки в компонент
export const addCard = (container, cardElement) => {
  container.prepend(cardElement);
};

// Удаление карточки
const dropCard = (e) => {
  e.target.closest('.card').remove();
};

// Переключение "лайка"
const toggleLike = (e) => {
  e.target.classList.toggle('card__btn-like_active');
};

export const initCards = () => {
  initialCards.forEach((card) => addCard(cardsHolder, createCard(card.name, card.link)));
};
