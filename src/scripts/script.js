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

const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

const profilePopup = document.querySelector("#profile-popup");
const profilePopupName = profilePopup.querySelector("#name");
const profilePopupAppointment = profilePopup.querySelector("#appointment");

const cardPopup = document.querySelector("#card-popup");
const cardPopupTitle = cardPopup.querySelector("#title");
const cardPopupLink = cardPopup.querySelector("#link");

const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");
const cardsHolder = document.querySelector(".cards__list");

const viewerPopup = document.querySelector("#viewer-popup");
const viewerImage = viewerPopup.querySelector(".viewer__image");
const viewerCation = viewerPopup.querySelector(".viewer__caption");

/** Отображение/скрытие попапа */

const openPopup = (popup) => {
  smoothOpening(popup);
  popup.classList.add("popup_opened");
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
};

// Чтобы попап плавно появлялся и пропадал добавил ему transition
// при transition visibility 0s после закрытия попап сразу пропадает,
// при transition visibility 0.5s анимация исчезновения появляется при загрузке страницы,
// т.ч. добавляем транзакцию только после первого открытия попапа
const smoothOpening = (popup) => {
  if (!popup.classList.contains("overlay")) {
    popup.classList.add("overlay");
  }
};

/** Изменение данных профиля */

document.querySelector(".profile__btn-edit").addEventListener("click", () => {
  // Предзаполняем поля формы информацией из профиля
  profilePopupName.value = profileTitle.textContent;
  profilePopupAppointment.value = profileSubtitle.textContent;

  openPopup(profilePopup);
});

profilePopup.querySelector(".popup__btn-close").addEventListener("click", () => {
  closePopup(profilePopup);
});

profilePopup.querySelector(".popup__form").addEventListener("submit", (e) => {
  e.preventDefault();

  // Скидываем информация из формы обратно в профиль
  profileTitle.textContent = profilePopupName.value;
  profileSubtitle.textContent = profilePopupAppointment.value;

  closePopup(profilePopup);
});

/** Попап добавления карточки */

document.querySelector(".profile__btn-add").addEventListener("click", () => {
  // Чистим поля формы если они были заполнены ранее
  cardPopupTitle.value = "";
  cardPopupLink.value = "";

  openPopup(cardPopup);
});

cardPopup.querySelector(".popup__btn-close").addEventListener("click", () => {
  closePopup(cardPopup);
});

cardPopup.querySelector(".popup__form").addEventListener("submit", (e) => {
  e.preventDefault();

  const title = cardPopupTitle.value;
  const link = cardPopupLink.value;

  // Если форма заполнена правильно, то создаём и добавляем в DOM новую карточку
  if (title && link) {
    addCard(cardsHolder, createCard(title, link));
  } else return;

  closePopup(cardPopup);
});

/** Создание и удаление карточек */

const createCard = (name, link) => {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector(".card__title").textContent = name;

  const imgElelemnt = cardElement.querySelector(".card__image");
  imgElelemnt.src = link;
  imgElelemnt.alt = name;

  cardElement.querySelector(".card__image").addEventListener("click", () => viewImage(link, name));
  cardElement.querySelector(".card__btn-like").addEventListener("click", toggleLike);
  cardElement.querySelector(".card__btn-remove").addEventListener("click", dropCard);

  return cardElement;
};

const addCard = (container, cardElement) => {
  container.prepend(cardElement);
};

const dropCard = (e) => {
  e.target.closest(".card").remove();
};

const toggleLike = (e) => {
  e.target.classList.toggle("card__btn-like_active");
};

/** Попап просмотра изображения */

viewerPopup.querySelector(".popup__btn-close").addEventListener("click", () => {
  closePopup(viewerPopup);
});

const viewImage = (link, caption) => {
  viewerImage.src = link;
  viewerImage.alt = caption;
  viewerCation.textContent = caption;

  openPopup(viewerPopup);
};

/** Инициализация */

// При первичной загрузке страницы создаём предзаполненные карточки
(function init() {
  initialCards.forEach((card) => addCard(cardsHolder, createCard(card.name, card.link)));
})();
