const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

const profileEditPopup = document.querySelector(".popup");

const onProfileSubmit = (e) => {
  e.preventDefault();

  profileTitle.textContent = e.target.querySelector("#name").value;
  profileSubtitle.textContent = e.target.querySelector("#appointment").value;

  closePopup();
};

document.querySelector(".profile__btn-edit").addEventListener("click", () => {
  const nameInp = document.createElement("input");
  nameInp.type = "text";
  nameInp.id = "name";
  nameInp.name = "name";
  nameInp.className = "popup__input";
  nameInp.value = profileTitle.textContent;

  const appointmentInp = document.createElement("input");
  appointmentInp.type = "text";
  appointmentInp.id = "appointment";
  appointmentInp.name = "appointment";
  appointmentInp.className = "popup__input";
  appointmentInp.value = profileSubtitle.textContent;

  openPopup("Редактировать профиль", "Сохранить", onProfileSubmit, nameInp, appointmentInp);
});

profileEditPopup.querySelector(".popup__btn-close").addEventListener("click", () => {
  closePopup();
});
