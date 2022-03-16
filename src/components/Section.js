// Класс Section для добавления карточек в верстку
export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  // Публичная функция для "ручного" добавления карточки
  addItem = (card) => {
    const generated = card.generateCard();
    this._renderer(generated, this._containerSelector);
  };

  // Публичная функция для отрисовки массива карточек, которые придут с сервера. А они уже последовательно будут передаваться в контейнер через функцию addItem()
  renderItems(cards) {
    cards.forEach((card) => {
      this.addItem(card);
    });
  }
}
