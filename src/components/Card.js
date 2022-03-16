export default class Card {
  constructor(data, templateSelector, handleCardClick, ownerId, api, showError) {
    this._id = data._id;
    this._link = data.link; // Картинка карточки
    this._name = data.name; // Подпись к карточке
    this._likes = data.likes;
    this._ownerId = ownerId;
    this._disposable = data.owner._id === ownerId;

    this._api = api;
    this._showError = showError;
    this._handleCardClick = handleCardClick; // Обработчик клика по картинке => чтобы на этой карточке сработала функция открытия попапа

    this._cardTemplate = document.querySelector(templateSelector).content.querySelector('.card');
  }

  // Создадим шаблон разметки карточки
  _getTemplate() {
    const cardElement = this._cardTemplate.cloneNode(true);
    return cardElement;
  }

  // Удаление карточки
  _dropCard() {
    this._api
      .deleteCard(this._id)
      .then(() => this._element.closest('.card').remove())
      .catch(this._showError);
  }

  // Переключение лайка
  _toggleLike() {
    if (this._likeButton.classList.contains('card__btn-like_active')) {
      this._api
        .unlikeCard(this._id)
        .then((data) => {
          this._likeButton.classList.remove('card__btn-like_active');
          this._reloadLikes(data.likes.length);
        })
        .catch(this._showError);
    } else {
      this._api
        .likeCard(this._id)
        .then((data) => {
          this._likeButton.classList.add('card__btn-like_active');
          this._reloadLikes(data.likes.length);
        })
        .catch(this._showError);
    }
  }

  _reloadLikes(likes) {
    this._likesDisplay.textContent = likes;
  }

  // Генератор элемента карточки (публичный)
  generateCard() {
    this._element = this._getTemplate();
    this._likesDisplay = this._element.querySelector('.card__likes');

    this._likeButton = this._element.querySelector('.card__btn-like');
    this._removeButton = this._element.querySelector('.card__btn-remove');

    // Наполним карточку содержимым
    this._cardImage = this._element.querySelector('.card__image');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;

    if (this._likes?.find((like) => like._id === this._ownerId)) {
      this._likeButton.classList.add('card__btn-like_active');
    }

    this._reloadLikes(this._likes?.length ?? 0);

    if (this._disposable) {
      this._removeButton.classList.add('card__btn-remove_visible');
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
      this._removeButton.addEventListener('click', () => {
        this._dropCard();
      });
    }

    // Слушатель кликов по картинке -> вызов функции открытия попапа-3:
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });
  }
}
