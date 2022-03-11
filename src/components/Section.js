// Класс Section для добавления карточек в верстку
/*
export default class Section {
    constructor( { renderer }, containerSelector ) {
        this._renderer = renderer;
        this._containerElement = document.querySelector(containerSelector);
    }

    // Публичная функция для "ручного" добавления карточки
    addItem(item) { // В item должен лежать DOM-элемент, который мы передаем в контейнер
        this._containerElement.prepend(item);
    }

    // Публичная функция для отрисовки массива карточек, которые придут с сервера. А они уже последовательно будут передаваться в контейнер через функцию addItem()
    renderItems(items) {
        items.forEach(item => this._renderer(item));
    }
}
*/