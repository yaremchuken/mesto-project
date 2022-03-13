import '../styles/index.css';
import api from './Api';
import { selectors } from './constants';
import FormValidator from './FormValidator';
import PopupWithForm from './PopupWithForm';
import PopupWithImage from './PopupWithImage';
import userInfo from './UserInfo';
import { showError } from './utils';
import Card from './Card';
import Section from './Section';



// enableValidation(selectors);

const viewer = new PopupWithImage('#viewer-popup');
viewer.setEventListeners();

const avatarPopup = new PopupWithForm('#avatar-popup', (popupSelector) => {
  const link = document.querySelector(popupSelector).querySelector('#avatar-link');
  const img = document.querySelector('.profile__avatar-img');

  return api.updateAvatar(link.value).then(() => (img.src = link.value));
});

const profilePopup = new PopupWithForm('#profile-popup', (popupSelector) => {
  const popup = document.querySelector(popupSelector);
  const name = popup.querySelector('#name');
  const appointment = popup.querySelector('#appointment');

  return userInfo.setUserInfo({ name: name.value, about: appointment.value });
});

const cardPopup = new PopupWithForm('#card-popup', (popupSelector) => {
  const popup = document.querySelector(popupSelector);
  const title = popup.querySelector('#title').value;
  const link = popup.querySelector('#link').value;

  return api.uploadCard(title, link).then((data) => {
    addToHolder(createCard(data._id, title, link, [], viewer));
  });
});

new FormValidator(selectors, '#avatar-popup').enableValidation()
new FormValidator(selectors, '#profile-popup').enableValidation()
new FormValidator(selectors, '#card-popup').enableValidation()

document.querySelector('.profile__avatar-edit').addEventListener('click', () => avatarPopup.open());
document.querySelector('.profile__btn-edit').addEventListener('click', () => profilePopup.open());
document.querySelector('.profile__btn-add').addEventListener('click', () => cardPopup.open());

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userInfoResponse, cardsResponse]) => {
    userInfo.setUserFields(userInfoResponse);
    initCards(cardsResponse, viewer, userInfoResponse._id);
  })
  .catch(showError);











  
// Функция открытия попапа с картинкой по клику по карточке
function handleCardClick(link, name) {

}



//////// ФУНКЦИИ, СВЯЗАННЫЕ С РЕНДЕРОМ КАРТОЧКИ

const createCard = (cardData) => {
  const card = new Card(cardData, '#card-template', handleCardClick);

  return card.generateCard();
};


const cardSection = new Section (
  {
    renderer: (cardData) => {
      cardSection.addItem(createCard(cardData));
    },
  },
  '.cards'
);

















/*

//ДОБАВЛЕНИЕ И СОХРАНЕНИЕ НОВОЙ КАРТОЧКИ
// ФУНКЦИЯ СОХРАНЕНИЯ НОВОЙ КАРТОЧКИ ИЗ ПОПАПА


// Константа для попапа добавления карточки
const popupAddCard = document.querySelector('#card-popup');

// Константа формы для добавления новой карточки
const formAddCard = popupAddCard.querySelector('.popup__form');


const addNewCardData = (event) => {
  event.preventDefault();

  // Кладем значения попапа в "сундук" (объект) для их передачи в конструктор
  const data = {
    image: cardImage.value,
    caption: cardCaption.value
  };

// Получаем объект = экземпляр класса Card через вспомогательную общую функцию createCard:
  const card = createCard(data);

  // Готовим карточку к печати, используя публичный метод класса Card:
  const cardElement = card.generateCard();
  // Добавляем ее в DOM:
  cardsElement.prepend(cardElement);

  //Сбрасываем поля формы:
  formAddCard.reset();

  closePopup(event.target.closest('.popup'));

  // КНОПКУ САБМИТА ПОСЛЕ САБМИТА ФОРМЫ ДЕАКТИВИРУЕМ В ФАЙЛЕ VALIDATE.JS
}

// ВЫЗОЕМ ФУНКЦИЮ СОХРАНЕНИЯ НОВОЙ КАРТОЧКИ ИЗ ПОПАПА
formAddCard.addEventListener('submit', addNewCardData); 
*/




