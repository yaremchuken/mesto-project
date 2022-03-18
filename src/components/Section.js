// Класс Section для добавления карточек в верстку
export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._containerElement = document.querySelector(containerSelector);
  }

  // Публичная функция для "ручного" добавления карточки
  addItem = (cardData) => {
    const card = this._renderer(cardData);
    this._containerElement.prepend(card);
  };

  // Публичная функция для отрисовки массива карточек, которые придут с сервера. А они уже последовательно будут передаваться в контейнер через функцию addItem()
  renderItems(cardDatas) {
    cardDatas.forEach((cardData) => this.addItem(cardData));
  }
}
