import { closePopup } from './modal';
import { hideFormErrors } from './validate';

export const performOnPopupClose = (popup, selectors) => {
  hideFormErrors(popup.querySelector('.popup__form'), selectors);
  closePopup(popup);
};

export const showError = (error) => {
  alert(`Произошла ошибка загрузки данных ${error.message}`);
};
