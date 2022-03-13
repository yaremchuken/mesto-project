import api from './Api';
import userInfo from './UserInfo';
import { showError } from './utils';

export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._id = data._id;
    this._link = data.link; // Картинка карточки
    this._name = data.name; // Подпись к карточке
    this._likes = data.likes;
    this._disposable = data.owner._id === userInfo.getUserId();

    this._templateSelector = templateSelector; // Селектор шаблона разметки, куда вставится карточка
    this._handleCardClick = handleCardClick; // Обработчик клика по картинке => чтобы на этой карточке сработала функция открытия попапа
  }

  // Создадим шаблон разметки карточки
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  // Удаление карточки
  _dropCard() {
    api
      .deleteCard(this._id)
      .then(() => this._element.closest('.card').remove())
      .catch(showError);
  }

  // Переключение лайка
  _toggleLike() {
    if (this._likeButton.classList.contains('card__btn-like_active')) {
      // КАК МЫ ПОЛУЧАЕМ ДОСТУП К this._likeButton?
      api
        .unlikeCard(this._id)
        .then((data) => {
          this._likeButton.classList.remove('card__btn-like_active');
          this._reloadLikes(data.likes.length);
        })
        .catch(showError);
    } else {
      api
        .likeCard(this._id)
        .then((data) => {
          this._likeButton.classList.add('card__btn-like_active');
          this._reloadLikes(data.likes.length);
        })
        .catch(showError);
    }
  }

  _reloadLikes(likes) {
    this._element.querySelector('.card__likes').textContent = likes;
  }

  // Генератор элемента карточки (публичный)
  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.card__btn-like');
    this._cardImage = this._element.querySelector('.card__image');

    // Наполним карточку содержимым
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;

    if (this._likes?.find((like) => like._id === userInfo.getUserId())) {
      this._element.querySelector('.card__btn-like').classList.add('card__btn-like_active');
    }

    this._reloadLikes(this._likes?.length ?? 0);

    if (this._disposable) {
      this._element.querySelector('.card__btn-remove').classList.add('card__btn-remove_visible');
    }

    this._setEventListeners();

    return this._element;
  }

  // Добавление слушателей
  _setEventListeners() {
    // Переключение лайка
    this._likeButton.addEventListener('click', () => {
      this._toggleLike();
    });

    if (this._disposable) {
      // Удаление карточки
      this._element.querySelector('.card__btn-remove').addEventListener('click', () => {
        this._dropCard();
      });
    }

    // Слушатель кликов по картинке -> вызов функции открытия попапа-3:
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });
  }
}
