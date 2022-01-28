export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');
const profileAvatarImg = document.querySelector('.profile__avatar-img');

export let profileId;

export const initProfile = (profileData) => {
  profileId = profileData._id;
  profileTitle.textContent = profileData.name;
  profileSubtitle.textContent = profileData.about;
  profileAvatarImg.src = profileData.avatar;
};
