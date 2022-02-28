import api from './Api';
import { showError } from './utils';

class UserInfo {
  _userId;

  constructor({ userNameSelector, userAboutSelector, avatarSelector }) {
    this._userNameSelector = userNameSelector;
    this._userAboutSelector = userAboutSelector;
    this._avatarSelector = avatarSelector;
  }

  getUserId() {
    return this._userId;
  }

  getUserInfo() {
    return api.getUserInfo().then(({ _id }) => (this._userId = _id));
  }

  setUserInfo({ name, about }) {
    return api
      .updateUserInfo({ name, about })
      .catch(showError)
      .then(() => this.setUserFields({ name, about }));
  }

  setUserFields({ name, about, avatar }) {
    document.querySelector(this._userNameSelector).textContent = name;
    document.querySelector(this._userAboutSelector).textContent = about;

    if (avatar) {
      document.querySelector(this._avatarSelector).src = avatar;
    }
  }
}

const userInfo = new UserInfo({
  userNameSelector: '.profile__title',
  userAboutSelector: '.profile__subtitle',
  avatarSelector: '.profile__avatar-img',
});

export default userInfo;
