/** Попап добавления карточки */

import { selectors } from '..';
import { uploadCard } from './api';
import { addToHolder, createCard } from './card';
import { closePopup, openPopup } from './modal';
import { checkFormValid } from './validate';

const cardPopup = document.querySelector('#card-popup');
const cardPopupTitle = cardPopup.querySelector('#title');
const cardPopupLink = cardPopup.querySelector('#link');

cardPopup.querySelector('.popup__btn-close').addEventListener('click', () => {
  closePopup(cardPopup);
});

cardPopup.querySelector('.popup__form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = cardPopupTitle.value;
  const link = cardPopupLink.value;

  const submitBtn = e.target.querySelector('.popup__btn-submit');
  submitBtn.textContent = 'Сохранение...';

  // Если форма заполнена правильно, то создаём и добавляем в DOM новую карточку
  if (checkFormValid(e.target, selectors)) {
    uploadCard(title, link).then((data) => {
      addToHolder(createCard(data._id, title, link));
      submitBtn.textContent = 'Сохранить';
      closePopup(cardPopup);
    });
  } else return;
});

export const handleCardModalOpenClick = () => {
  // Чистим поля формы если они были заполнены ранее
  cardPopupTitle.value = '';
  cardPopupLink.value = '';

  openPopup(cardPopup);
};
