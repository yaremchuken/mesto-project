import Card from './Card.js';

// Класс Section для добавления карточек в верстку

export default class Section {
    constructor( { renderer }, containerSelector ) {
        this._renderer = renderer;
        this._containerSelector = document.querySelector(containerSelector);
    }

    // Публичная функция для "ручного" добавления карточки
    addItem(item) { // В item должен лежать DOM-элемент, который мы передаем в контейнер
        this._containerSelector.prepend(item);
    }

    // Публичная функция для отрисовки массива карточек, которые придут с сервера. А они уже последовательно будут передаваться в контейнер через функцию addItem()
    renderItems() {
        this._renderer.forEach((item) => {
            const card = new Card(item, '#card-template', handleCardClick);
            const cardElement = card.generateCard();
            this._addItem(cardElement);

            return cardElement;
        }
    }
}
