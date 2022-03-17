// Класс Section для добавления карточек в верстку
export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._containerElement = document.querySelector(containerSelector);
  }

  // Публичная функция для "ручного" добавления карточки
  addItem = (card) => {
    this._containerElement.prepend(card);
  };

  // Публичная функция для отрисовки массива карточек, которые придут с сервера. А они уже последовательно будут передаваться в контейнер через функцию addItem()
  renderItems(cardDatas) {
    const cards = cardDatas.map((cardData) => this._renderer(cardData));
    cards.forEach((card) => {
      this.addItem(card);
    });
  }
}
