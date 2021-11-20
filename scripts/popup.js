const popup = document.querySelector(".popup");
const inputsContainer = popup.querySelector(".popup__input-container");
const form = popup.querySelector(".popup__form");

let callbackMemo;

const openPopup = (heading, submitTitle, submitCallback, ...inputs) => {
  popup.querySelector(".popup__input-container").textContent = "";
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
