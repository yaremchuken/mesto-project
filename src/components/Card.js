export default class Card {
  constructor(data, templateSelector, handleLike, dropCard, handleCardClick, ownerId) {
    this._id = data._id;
    this._link = data.link; // Картинка карточки
    this._name = data.name; // Подпись к карточке
    this._likes = data.likes;
    this._ownerId = ownerId;
    this._disposable = data.owner._id === ownerId;

    this._handleLike = handleLike;
    this._dropCard = dropCard;
    this._handleCardClick = handleCardClick; // Обработчик клика по картинке => чтобы на этой карточке сработала функция открытия попапа

    this._cardTemplate = document.querySelector(templateSelector).content.querySelector('.card');
  }

  // Создадим шаблон разметки карточки
  _getTemplate() {
    const cardElement = this._cardTemplate.cloneNode(true);
    return cardElement;
  }

  updateLikes() {
    this._likeButton.classList.remove('card__btn-like_active');
    this._reloadLikes(data.likes.length);
  }

  isLiked() {
    return this._likeButton.classList.contains('card__btn-like_active') === true;
  }

  deleteCard() {
    getElement().closest('.card').remove();
  }


  reloadLikes(likes) {
    this._likesDisplay.textContent = likes;
  }


  getID() {
    return this._id;
  }

  getElement() {
    return this._element;
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

    this.reloadLikes(this._likes?.length ?? 0);

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
      this._handleLike(this);
    });

    if (this._disposable) {
      // Удаление карточки
      this._removeButton.addEventListener('click', () => {
        this._dropCard(this);
      });
    }

    // Слушатель кликов по картинке -> вызов функции открытия попапа-3:
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });
  }
}
