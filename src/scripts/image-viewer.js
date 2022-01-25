/** Попап просмотра изображения */

import { openPopup, closePopup } from './modal';

const viewerPopup = document.querySelector('#viewer-popup');
const viewerImage = viewerPopup.querySelector('.viewer__image');
const viewerCation = viewerPopup.querySelector('.viewer__caption');

viewerPopup.querySelector('.popup__btn-close').addEventListener('click', () => {
  closePopup(viewerPopup);
});

export const viewImage = (link, caption) => {
  viewerImage.src = link;
  viewerImage.alt = caption;
  viewerCation.textContent = caption;

  openPopup(viewerPopup);
};
