const popup = document.querySelector(".popup");
const inputsContainer = popup.querySelector(".popup__input-container");
const form = popup.querySelector(".popup__form");

let callbackMemo;

const openPopup = (heading, submitTitle, submitCallback, ...inputs) => {
  // Чтобы попап плавно появлялся и пропадал добавил ему transition
  // при transition visibility 0s после закрытия попапа сразу пропадает,
  // при transition visibility 0.5s анимация исчезновения появляется при загрузке страницы,
  // т.ч. добавляем транзакцию только после первого открытия попапа
  if (!popup.classList.contains("overlay")) {
    popup.classList.add("overlay");
  }

  inputsContainer.textContent = "";
  popup.querySelector(".popup__heading").textContent = heading;
  popup.querySelector(".popup__btn-submit").textContent = submitTitle;

  inputs.forEach((i) => inputsContainer.appendChild(i));

  form.addEventListener("submit", submitCallback);
  callbackMemo = submitCallback;

  togglePopup();
};

const closePopup = () => {
  form.removeEventListener("submit", callbackMemo);

  togglePopup();
};

const togglePopup = () => {
  popup.classList.toggle("popup_opened");
};
