import { closePopup } from './modal';
import { hideFormErrors } from './validate';

export const performOnPopupClose = (popup, submitBtn, selectors) => {
  submitBtn.textContent = 'Сохранить';
  hideFormErrors(popup.querySelector('.popup__form'), selectors);
  closePopup(popup);
};

export const showError = (error) => {
  alert(`Произошла ошибка загрузки данных ${error.message}`);
};
