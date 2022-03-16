export default class UserInfo {
  constructor({ userNameSelector, userAboutSelector, avatarSelector }, api, showError) {
    this._userNameSelector = userNameSelector;
    this._userAboutSelector = userAboutSelector;
    this._avatarSelector = avatarSelector;
    this._api = api;
    this._showError = showError;
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
    return this._api
      .updateUserInfo({ name, about })
      .catch(this._showError)
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
