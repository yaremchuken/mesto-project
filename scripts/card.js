const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const cardsHolder = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");

const addCardBtn = document.querySelector(".profile__btn-add");

const onCardSubmit = (e) => {
  e.preventDefault();

  const title = e.target.querySelector("#title").value;
  const link = e.target.querySelector("#link").value;

  addCard(title, link);

  closePopup();
};

addCardBtn.addEventListener("click", () => {
  const titleInp = document.createElement("input");
  titleInp.type = "text";
  titleInp.id = "title";
  titleInp.name = "title";
  titleInp.className = "popup__input";
  titleInp.placeholder = "Название";

  const linkInp = document.createElement("input");
  linkInp.type = "text";
  linkInp.id = "link";
  linkInp.name = "link";
  linkInp.className = "popup__input";
  linkInp.placeholder = "Ссылка на картинку";

  openPopup("Новое место", "Создать", onCardSubmit, titleInp, linkInp);
});

const addCard = (title, link) => {
  const cardEl = cardTemplate.cloneNode(true);

  cardEl.querySelector(".card__title").textContent = title;

  const imgEl = cardEl.querySelector(".card__image");
  imgEl.src = link;
  imgEl.alt = title;

  cardEl.querySelector(".card__image").addEventListener("click", () => viewImage(link, title));

  cardEl.querySelector(".card__btn-like").addEventListener("click", toggleLike);

  cardEl.querySelector(".card__btn-remove").addEventListener("click", dropCard);

  cardsHolder.prepend(cardEl);
};

const dropCard = (e) => {
  e.target.closest(".card").remove();
};

const toggleLike = (e) => {
  e.target.classList.toggle("card__btn-like_active");
};

(function init() {
  initialCards.forEach((card) => addCard(card.name, card.link));
})();
