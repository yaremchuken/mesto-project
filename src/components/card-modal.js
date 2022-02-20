/** Попап добавления карточки */

import api from './Api';
import { addToHolder, createCard } from './card';
import { openPopup } from './modal';
import { performOnPopupClose, showError } from './utils';
import { checkFormValid, toggleSubmitBtnState } from './validate';
import { selectors } from './constants';

const cardPopup = document.querySelector('#card-popup');
const cardPopupTitle = cardPopup.querySelector('#title');
const cardPopupLink = cardPopup.querySelector('#link');
const form = cardPopup.querySelector('.popup__form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = cardPopupTitle.value;
  const link = cardPopupLink.value;

  const submitBtn = e.submitter;
  submitBtn.textContent = 'Сохранение...';

  // Если форма заполнена правильно, то создаём и добавляем в DOM новую карточку
  if (checkFormValid(e.target, selectors)) {
    api
      .uploadCard(title, link)
      .then((data) => {
        addToHolder(createCard(data._id, title, link));
        performOnPopupClose(cardPopup, selectors);
      })
      .catch(showError)
      .finally(() => (submitBtn.textContent = 'Сохранить'));
  } else return;
});

export const handleCardModalOpenClick = () => {
  // Чистим поля формы если они были заполнены ранее
  cardPopupTitle.value = '';
  cardPopupLink.value = '';

  toggleSubmitBtnState(form, selectors);
  openPopup(cardPopup);
};
