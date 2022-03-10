/** Манипуляции с карточками - добавление, удаление, лайки */

import api from './Api';
import userInfo from './UserInfo';
import { showError } from './utils';

const cardsHolder = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

// Создание карточки
export const createCard = (id, name, link, likes, viewer, disposable = true) => {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.card__title').textContent = name;
  cardElement.id = id;

  const imgElelemnt = cardElement.querySelector('.card__image');
  imgElelemnt.src = link;
  imgElelemnt.alt = name;
  imgElelemnt.addEventListener('click', () => viewer.open(link, name));

  cardElement.querySelector('.card__btn-like').addEventListener('click', toggleLike);

  if (likes?.find((like) => like._id === userInfo.getUserId())) {
    cardElement.querySelector('.card__btn-like').classList.add('card__btn-like_active');
  }

  reloadLikes(cardElement, likes?.length ?? 0);

  if (disposable) {
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
  api
    .deleteCard(id)
    .then((_) => e.target.closest('.card').remove())
    .catch(showError);
};

// Переключение "лайка"
const toggleLike = (e) => {
  const card = e.target.closest('.card');
  if (e.target.classList.contains('card__btn-like_active')) {
    api
      .unlikeCard(card.id)
      .then((data) => {
        e.target.classList.remove('card__btn-like_active');
        reloadLikes(card, data.likes.length);
      })
      .catch(showError);
  } else {
    api
      .likeCard(card.id)
      .then((data) => {
        e.target.classList.add('card__btn-like_active');
        reloadLikes(card, data.likes.length);
      })
      .catch(showError);
  }
};

const reloadLikes = (card, likes) => {
  card.querySelector('.card__likes').textContent = likes;
};

export const initCards = (cards, viewer, userId) => {
  cards.forEach((card) => {
    const disposable = card.owner._id === userId;
    addCard(cardsHolder, createCard(card._id, card.name, card.link, card.likes, viewer, disposable));
  });
};









// КЛАСС ДЛЯ ОБРАБОТКИ КАРТОЧЕК
/*
export default class Card {
  // КОНСТРУКТОР
  constructor(data, cardSelector, clickPreviewImage) {
    this._image = data.image; // Приватные поля для наполнения конкретной карточки
    this._caption = data.caption; // Приватные поля для наполнения конкретной карточки
    this._cardSelector = cardSelector; // Селектор шаблона разметки, куда вставится карточка
    this._clickPreviewImage = clickPreviewImage; // Обработчик клика по картинке => чтобы на этой карточке сработала функция открытия попапа
  }

  // CОЗДАДИМ ШАБЛОН РАЗМЕТКИ КАРТОЧКИ (наполнять разметку данными и публиковать карточку на странице будем ниже другими методами)
  _getTemplate() {
    // Заберем шаблон из HTML и клонируем его элемент:
    const cardElement = document
    .querySelector(this._cardSelector) // Тут селектор шаблона разметки: он попадает сюда как аргумент через конструктор выше
    .content
    .querySelector('.element')
    .cloneNode(true);

    // Вернем DOM-элемент карточки:
    return cardElement;
  }


  // ПОДГОТОВИМ КАРТОЧКУ К ПУБЛИКАЦИИ: НАПОЛНИМ ЕЕ КОНТЕНТОМ И НАСТРОИМ ЕЕ ПОВЕДЕНИЕ
  generateCard() {
    // Вставим созданный шаблон разметки в приватное поле _element:
    this._element = this._getTemplate();

    // Объявим классовую переменную для картинки карточки, чтобы не искать картинку несколько раз:
    this._cardImage = this._element.querySelector('.element__image');
    // Объявлю классовую переменную this._likeButton (= сделаю ее полем класса), чтобы искать этот элемент только 1 раз:
    this._likeButton = this._element.querySelector('.element__like-button');

    //Подключим к this-карточке все обработчики слушателей:
    this._setEventListeners();

    // Добавим данные:
    this._cardImage.src = this._image;
    this._cardImage.alt = this._caption;
    this._element.querySelector('.element__caption').textContent = this._caption;

   // И вернем элемент:
   return this._element;
  }


 // СЛУШАТЕЛИ КЛИКОВ ПО КАРТОЧКЕ
  _setEventListeners() {

    // Слушатель лайков:
    this._likeButton.addEventListener('click', () => {
      this._likeButtonHandler();
    });

    // Слушатель кликов по мусорке:
    this._element.querySelector('.element__button-remove').addEventListener('click', () => {
      this._removeElementHandler();
  });

  // Слушатель кликов по картинке -> вызов функции открытия попапа-3:
  this._cardImage.addEventListener('click', () => {
      this._clickPreviewImage(this._image, this._caption);
    });
  }

// ФУНКЦИИ
  // Лайк
  _likeButtonHandler() {
    this._likeButton.classList.toggle('element__like-button_active');
  }

  // Удаление карточки
  _removeElementHandler() {
    this._element.closest('.element').remove();
  }

} // Конец класса Card
*/