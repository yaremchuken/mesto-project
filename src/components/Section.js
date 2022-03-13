import Card from './Card.js';

// Класс Section для добавления карточек в верстку
export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  // Публичная функция для "ручного" добавления карточки
  addItem = (data, viewer) => {
    const card = new Card(data, '#card-template', () => {
      viewer.open(data.link, data.name);
    });
    const generated = card.generateCard();
    this._renderer(generated, this._containerSelector);
  };

  // Публичная функция для отрисовки массива карточек, которые придут с сервера. А они уже последовательно будут передаваться в контейнер через функцию addItem()
  renderItems(cardsData, viewer) {
    cardsData.forEach((data) => {
      this.addItem(data, viewer);
    });
  }
}
