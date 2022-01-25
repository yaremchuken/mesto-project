/** Отображение/скрытие попапа */

import { hideFormErrors, toggleSubmitBtnState } from './validator.js';

document.addEventListener('keyup', (e) => {
  const popup = document.querySelector('.popup_opened');
  if (popup) {
    closePopup(popup);
  }
});

document.querySelectorAll('.popup').forEach((popup) => {
  popup.addEventListener('click', (e) => {
    e.stopPropagation();
    if (e.target.classList.contains('overlay')) {
      closePopup(popup);
    }
  });
});

export const openPopup = (popup) => {
  smoothOpening(popup);
  if (popup.querySelector('.popup__form')) toggleSubmitBtnState(popup.querySelector('.popup__form'));
  popup.classList.add('popup_opened');
};

export const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  if (popup.querySelector('.popup__form')) hideFormErrors(popup.querySelector('.popup__form'));
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
