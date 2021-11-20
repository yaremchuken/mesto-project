const initialCards = [
  {
    name: "Отголоски далёкого прошлого",
    link: "https://images-assets.nasa.gov/image/PIA09219/PIA09219~medium.jpg",
  },
  {
    name: "Орион",
    link: "https://images-assets.nasa.gov/image/PIA04227/PIA04227~small.jpg",
  },
  {
    name: "Бетельгейзе",
    link: "https://images-assets.nasa.gov/image/PIA16680/PIA16680~orig.jpg",
  },
  {
    name: "Андромеда",
    link: "https://images-assets.nasa.gov/image/PIA15416/PIA15416~medium.jpg",
  },
  {
    name: "Петля Лебедя",
    link: "https://images-assets.nasa.gov/image/PIA15415/PIA15415~medium.jpg",
  },
  {
    name: "Галактика Центавра",
    link: "https://images-assets.nasa.gov/image/PIA04624/PIA04624~medium.jpg",
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
