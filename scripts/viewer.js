const viewer = document.querySelector(".viewer");

console.log(viewer.querySelector(".popup__btn-close"));

viewer.querySelector(".popup__btn-close").addEventListener("click", () => viewer.classList.remove("viewer_opened"));

const viewImage = (link, caption) => {
  viewer.querySelector(".viewer__image").src = link;
  viewer.querySelector(".viewer__caption").textContent = caption;

  viewer.classList.add("viewer_opened");
};
