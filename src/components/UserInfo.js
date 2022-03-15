import api from './Api';
import { showError } from '../utils/utils';

class UserInfo {
  _id;
  _name;
  _about;

  constructor({ userNameSelector, userAboutSelector, avatarSelector }) {
    this._userNameSelector = userNameSelector;
    this._userAboutSelector = userAboutSelector;
    this._avatarSelector = avatarSelector;
  }

  getId() {
    return this._id;
  }

  getName() {
    return this._name;
  }

  getAbout() {
    return this._about;
  }

  updateUserInfo({ name, about }) {
    return api
      .updateUserInfo({ name, about })
      .catch(showError)
      .then(() => this.setUserFields({ name, about }));
  }

  setUserFields({ _id, name, about, avatar }) {
    this._id = _id;
    this._name = name;
    this._about = about;

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
