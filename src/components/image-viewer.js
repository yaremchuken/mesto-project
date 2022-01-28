/** Попап просмотра изображения */

import { openPopup } from './modal';

const viewerPopup = document.querySelector('#viewer-popup');
const viewerImage = viewerPopup.querySelector('.viewer__image');
const viewerCation = viewerPopup.querySelector('.viewer__caption');

export const viewImage = (link, caption) => {
  viewerImage.src = link;
  viewerImage.alt = caption;
  viewerCation.textContent = caption;

  openPopup(viewerPopup);
};
